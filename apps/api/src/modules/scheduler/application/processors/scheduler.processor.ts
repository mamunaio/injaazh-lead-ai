import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { EmailEngineService } from '../../../email-engine/application/services/email-engine.service';
import { EmailDispatchService } from '../../../mail/application/services/email-dispatch.service';
import { TrackingService } from '../../../tracking/application/services/tracking.service';
import { SequenceManagerService } from '../../../sequences/application/services/sequence.manager.service';
import type { ICampaignRepository } from '../../../campaigns/domain/repositories/campaign.repository.interface';
import { CAMPAIGN_REPOSITORY } from '../../../campaigns/domain/repositories/campaign.repository.interface';
import type { ICampaignLeadRepository } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';
import { CAMPAIGN_LEAD_REPOSITORY } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';
import type { SequenceStep } from '../../../sequences/domain/entities/sequence.entity';

@Processor('scheduler-dispatch', {
  concurrency: 5,
  limiter: {
    max: 100, // Process 100 jobs
    duration: 60000, // per minute
  }
})
export class SchedulerProcessor extends WorkerHost {
  private readonly logger = new Logger(SchedulerProcessor.name);

  constructor(
    @Inject(CAMPAIGN_REPOSITORY) private readonly campaignRepo: ICampaignRepository,
    @Inject(CAMPAIGN_LEAD_REPOSITORY) private readonly campaignLeadRepo: ICampaignLeadRepository,
    @Inject(LEAD_REPOSITORY) private readonly leadRepo: ILeadRepository,
    private readonly sequenceManager: SequenceManagerService,
    private readonly emailEngine: EmailEngineService,
    private readonly emailService: EmailDispatchService,
    private readonly trackingService: TrackingService,
    @InjectQueue('scheduler-dispatch') private readonly schedulerQueue: Queue,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, campaignId, campaignLeadId, leadId } = job.data;
    this.logger.log(`Processing Scheduler Job for CampaignLead ${campaignLeadId}`);

    try {
      const campaign = await this.campaignRepo.findById(organizationId, campaignId);
      if (!campaign || campaign.status !== 'Active') {
        this.logger.warn(`Campaign ${campaignId} is not Active. Halting execution for lead.`);
        return;
      }

      const campaignLead = await this.campaignLeadRepo.findByCampaign(organizationId, campaignId)
        .then((leads: any[]) => leads.find((l: any) => l.id === campaignLeadId));

      if (!campaignLead) {
        this.logger.warn(`CampaignLead ${campaignLeadId} not found.`);
        return;
      }

      // 1. Check for Halt Conditions
      if (campaignLead.status === 'Completed' || campaignLead.status === 'Failed') {
        return;
      }
      
      const sequence = await this.sequenceManager.getSequence(organizationId, campaign.sequenceId!);
      if (!sequence) {
        throw new Error('Sequence not found for Campaign');
      }

      if (sequence.stopOnReply && campaignLead.hasReplied) {
        this.logger.log(`Lead ${leadId} has replied. Halting sequence as per stopOnReply rule.`);
        await this.campaignLeadRepo.updateStatus(organizationId, campaignLeadId, 'Completed');
        return;
      }

      // 2. Fetch the Current Step
      const currentStepIndex = campaignLead.currentSequenceStep;
      if (currentStepIndex >= sequence.steps.length) {
        this.logger.log(`CampaignLead ${campaignLeadId} has finished all sequence steps.`);
        await this.campaignLeadRepo.updateStatus(organizationId, campaignLeadId, 'Completed');
        return;
      }

      const step = sequence.steps[currentStepIndex];

      // 3. Execute Step Logic
      if (step.type === 'EMAIL') {
        await this.executeEmailStep(organizationId, leadId, step, job);
        // Ensure status reflects progressing state
        await this.campaignLeadRepo.updateStatus(organizationId, campaignLeadId, 'Processing');
      } else if (step.type === 'WAIT') {
        // Validation already ensures WAIT has delayDays
        this.logger.log(`Executing WAIT step (${step.delayDays} days) for CampaignLead ${campaignLeadId}`);
        // We do nothing immediately, we just proceed to schedule the next step
      }

      // 4. Schedule Next Action
      const nextStepIndex = currentStepIndex + 1;
      
      if (nextStepIndex >= sequence.steps.length) {
        // Last step just finished
        this.logger.log(`CampaignLead ${campaignLeadId} completed final step.`);
        await this.campaignLeadRepo.updateStatus(organizationId, campaignLeadId, 'Completed');
        return;
      }

      const nextStep = sequence.steps[nextStepIndex];
      let delayMs = 0;
      let nextActionDate = new Date();
      
      if (step.type === 'WAIT') {
        delayMs = (step.delayDays || 0) * 24 * 60 * 60 * 1000;
        nextActionDate = new Date(Date.now() + delayMs);
      }

      // Advance step pointer
      await this.campaignLeadRepo.updateSequenceProgress(organizationId, campaignLeadId, nextStepIndex, nextActionDate);
      
      await this.schedulerQueue.add('dispatch', {
        organizationId,
        campaignId,
        campaignLeadId,
        leadId,
      }, {
        delay: delayMs,
        jobId: `${campaignLeadId}-step-${nextStepIndex}`, // Ensure uniqueness
      });
      
      this.logger.log(`Scheduled next step (${nextStepIndex}) for CampaignLead ${campaignLeadId} with delay ${delayMs}ms`);

    } catch (error: any) {
      this.logger.error(`Failed to process scheduler job for CampaignLead ${campaignLeadId}: ${error.message}`);
      await this.campaignLeadRepo.updateStatus(organizationId, campaignLeadId, 'Failed');
      throw error; // Let BullMQ retry
    }
  }

  private async executeEmailStep(organizationId: string, leadId: string, step: SequenceStep, job: Job<any, any, string>) {
    this.logger.log(`Executing EMAIL step using template ${step.promptTemplateId}`);
    const lead = await this.leadRepo.findById(organizationId, leadId);
    if (!lead || !lead.email) {
      throw new Error('Lead missing or has no email address');
    }

    const generated = await this.emailEngine.generateEmail(organizationId, leadId, step.promptTemplateId);
    
    const { success, messageId } = await this.emailService.sendEmail(organizationId, lead.email, generated.subject, generated.body, leadId, job.data.campaignId);
    if (!success) {
      throw new Error('Email provider failed to send email');
    }

    if (messageId) {
      // Log Sent/Delivered internally immediately
      await this.trackingService.trackEvent(
        organizationId,
        messageId,
        job.data.campaignId,
        leadId,
        'Delivered'
      );
    }
  }
}

import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import type { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { CAMPAIGN_REPOSITORY } from '../../domain/repositories/campaign.repository.interface';
import type { ICampaignLeadRepository } from '../../domain/repositories/campaign-lead.repository.interface';
import { CAMPAIGN_LEAD_REPOSITORY } from '../../domain/repositories/campaign-lead.repository.interface';

@Injectable()
export class CampaignManagerService {
  constructor(
    @Inject(CAMPAIGN_REPOSITORY) private readonly campaignRepo: ICampaignRepository,
    @Inject(CAMPAIGN_LEAD_REPOSITORY) private readonly campaignLeadRepo: ICampaignLeadRepository,
    @InjectQueue('scheduler-dispatch') private readonly dispatchQueue: Queue,
  ) {}

  async createCampaign(organizationId: string, data: { name: string; leadSegmentId?: string; promptTemplateId?: string; sequenceId?: string; schedule?: string }) {
    return this.campaignRepo.create(organizationId, { 
      name: data.name, 
      status: 'Draft',
      leadSegmentId: data.leadSegmentId || null,
      promptTemplateId: data.promptTemplateId || null,
      sequenceId: data.sequenceId || null,
      schedule: data.schedule || null,
    });
  }

  async updateCampaign(organizationId: string, campaignId: string, updates: any) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (campaign.status !== 'Draft' && campaign.status !== 'Paused') {
      throw new BadRequestException(`Cannot update campaign in ${campaign.status} status.`);
    }
    return this.campaignRepo.update(organizationId, campaignId, updates);
  }

  async enrollLeads(organizationId: string, campaignId: string, leadIds: string[]) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    const enrollments = [];
    for (const leadId of leadIds) {
      const enrolled = await this.campaignLeadRepo.enroll(organizationId, campaignId, leadId);
      enrollments.push(enrolled);
    }
    return { enrolled: enrollments.length };
  }

  async startCampaign(organizationId: string, campaignId: string) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    await this.campaignRepo.updateStatus(organizationId, campaignId, 'Active');

    const enrolledLeads = await this.campaignLeadRepo.findByCampaign(organizationId, campaignId);
    
    // Add to BullMQ for scheduler dispatch
    const jobs = enrolledLeads
      .filter(l => l.status === 'Enrolled' || l.status === 'Failed')
      .map(lead => ({
        name: 'dispatch',
        data: {
          organizationId,
          campaignId,
          campaignLeadId: lead.id,
          leadId: lead.leadId,
        },
        opts: {
          attempts: 3,
          backoff: { type: 'exponential', delay: 10000 },
          jobId: `${lead.id}-step-0`,
        }
      }));

    if (jobs.length > 0) {
      await this.dispatchQueue.addBulk(jobs);
    }

    return { started: true, queuedJobs: jobs.length };
  }

  async pauseCampaign(organizationId: string, campaignId: string) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) throw new NotFoundException('Campaign not found');
    if (campaign.status !== 'Active') throw new BadRequestException('Only active campaigns can be paused.');
    return this.campaignRepo.updateStatus(organizationId, campaignId, 'Paused');
  }

  async resumeCampaign(organizationId: string, campaignId: string) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) throw new NotFoundException('Campaign not found');
    if (campaign.status !== 'Paused') throw new BadRequestException('Only paused campaigns can be resumed.');
    return this.campaignRepo.updateStatus(organizationId, campaignId, 'Active');
  }

  async stopCampaign(organizationId: string, campaignId: string) {
    const campaign = await this.campaignRepo.findById(organizationId, campaignId);
    if (!campaign) throw new NotFoundException('Campaign not found');
    if (campaign.status === 'Completed' || campaign.status === 'Stopped') {
      throw new BadRequestException('Campaign is already stopped or completed.');
    }
    return this.campaignRepo.updateStatus(organizationId, campaignId, 'Stopped');
  }

  async getCampaigns(organizationId: string) {
    return this.campaignRepo.findByOrganization(organizationId);
  }
}

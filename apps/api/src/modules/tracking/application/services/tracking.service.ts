import { Injectable, Inject, Logger } from '@nestjs/common';
import type { IEmailEventRepository } from '../../domain/repositories/email-event.repository.interface';
import { EMAIL_EVENT_REPOSITORY } from '../../domain/repositories/email-event.repository.interface';
import type { ICampaignLeadRepository } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';
import { CAMPAIGN_LEAD_REPOSITORY } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';
import { EmailEventType } from '../../domain/entities/email-event.entity';

@Injectable()
export class TrackingService {
  private readonly logger = new Logger(TrackingService.name);

  constructor(
    @Inject(EMAIL_EVENT_REPOSITORY) private readonly emailEventRepo: IEmailEventRepository,
    @Inject(CAMPAIGN_LEAD_REPOSITORY) private readonly campaignLeadRepo: ICampaignLeadRepository,
  ) {}

  async trackEvent(
    organizationId: string,
    messageId: string,
    campaignId: string,
    leadId: string,
    type: EmailEventType,
    userAgent?: string,
    ipAddress?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    try {
      // Avoid duplicate 'Opened' or 'Clicked' logs if we don't want to over-inflate DB
      // But usually, multiple opens are tracked. We'll track all for now.
      
      await this.emailEventRepo.create({
        organizationId,
        messageId,
        campaignId,
        leadId,
        type,
        userAgent,
        ipAddress,
        metadata
      });

      this.logger.log(`Logged ${type} event for message ${messageId}`);

      // Handle CampaignLead status updates
      if (type === 'Replied') {
        const campaignLeads = await this.campaignLeadRepo.findByCampaign(organizationId, campaignId);
        const campaignLead = campaignLeads.find(l => l.leadId.toString() === leadId);
        if (campaignLead && !campaignLead.hasReplied) {
          await this.campaignLeadRepo.updateStatus(organizationId, campaignLead.id, 'Completed');
          // In a real system, you might also have an updateHasReplied method, but setting to Completed/Failed halts the sequence
          this.logger.log(`Lead ${leadId} replied to campaign ${campaignId}. Sequence halted.`);
        }
      } else if (type === 'Bounced' || type === 'Unsubscribed') {
        const campaignLeads = await this.campaignLeadRepo.findByCampaign(organizationId, campaignId);
        const campaignLead = campaignLeads.find(l => l.leadId.toString() === leadId);
        if (campaignLead && campaignLead.status !== 'Failed') {
          await this.campaignLeadRepo.updateStatus(organizationId, campaignLead.id, 'Failed');
          this.logger.log(`Lead ${leadId} ${type.toLowerCase()}. Sequence halted.`);
        }
      }
    } catch (error: any) {
      this.logger.error(`Failed to track event ${type}: ${error.message}`);
    }
  }
}

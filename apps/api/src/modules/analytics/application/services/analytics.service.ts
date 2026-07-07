import { Injectable, Inject, Logger } from '@nestjs/common';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';
import type { IEmailEventRepository } from '../../../tracking/domain/repositories/email-event.repository.interface';
import { EMAIL_EVENT_REPOSITORY } from '../../../tracking/domain/repositories/email-event.repository.interface';
import type { ICampaignRepository } from '../../../campaigns/domain/repositories/campaign.repository.interface';
import { CAMPAIGN_REPOSITORY } from '../../../campaigns/domain/repositories/campaign.repository.interface';
import type { ICampaignLeadRepository } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';
import { CAMPAIGN_LEAD_REPOSITORY } from '../../../campaigns/domain/repositories/campaign-lead.repository.interface';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepo: ILeadRepository,
    @Inject(EMAIL_EVENT_REPOSITORY) private readonly emailEventRepo: IEmailEventRepository,
    @Inject(CAMPAIGN_REPOSITORY) private readonly campaignRepo: ICampaignRepository,
    @Inject(CAMPAIGN_LEAD_REPOSITORY) private readonly campaignLeadRepo: ICampaignLeadRepository,
  ) {}

  async getDashboardMetrics(organizationId: string) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      importedToday,
      aiGenerated,
      emailsSent,
      uniqueOpens,
      uniqueReplies
    ] = await Promise.all([
      this.leadRepo.count(organizationId),
      this.leadRepo.count(organizationId, { createdAt: { $gte: startOfToday } }),
      this.leadRepo.count(organizationId, { aiContext: { $ne: null } }),
      this.emailEventRepo.countEvents(organizationId, 'Delivered'), // We log Delivered internally when sent
      this.emailEventRepo.countUniqueLeads(organizationId, 'Opened'),
      this.emailEventRepo.countUniqueLeads(organizationId, 'Replied'),
    ]);

    const openRate = emailsSent > 0 ? (uniqueOpens / emailsSent) * 100 : 0;
    const replyRate = emailsSent > 0 ? (uniqueReplies / emailsSent) * 100 : 0;
    
    // MVP: Conversion Rate mirrors Reply Rate
    const conversionRate = replyRate; 

    return {
      totalLeads,
      importedToday,
      aiGenerated,
      emailsSent,
      openRate: parseFloat(openRate.toFixed(2)),
      replyRate: parseFloat(replyRate.toFixed(2)),
      conversionRate: parseFloat(conversionRate.toFixed(2)),
    };
  }

  async getCampaignsPerformance(organizationId: string) {
    const campaigns = await this.campaignRepo.findByOrganization(organizationId);
    const campaignStats = await this.campaignLeadRepo.getCampaignStats(organizationId);

    const statsMap = new Map<string, any>(campaignStats.map((s: any) => [s._id.toString(), s]));

    return campaigns.map((campaign: any) => {
      const stats: any = statsMap.get(campaign.id) || {
        totalLeads: 0,
        completedLeads: 0,
        failedLeads: 0,
        activeLeads: 0
      };

      return {
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        stats: {
          totalLeads: stats.totalLeads,
          activeLeads: stats.activeLeads,
          completedLeads: stats.completedLeads,
          failedLeads: stats.failedLeads,
        }
      };
    });
  }
}

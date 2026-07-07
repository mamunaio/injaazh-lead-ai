import { CampaignLead } from '../entities/campaign-lead.entity';

export interface ICampaignLeadRepository {
  enroll(organizationId: string, campaignId: string, leadId: string): Promise<CampaignLead>;
  findByCampaign(organizationId: string, campaignId: string): Promise<CampaignLead[]>;
  updateStatus(organizationId: string, id: string, status: CampaignLead['status']): Promise<void>;
  updateSequenceProgress(organizationId: string, id: string, currentStep: number, nextActionDate: Date | null): Promise<void>;
  getCampaignStats(organizationId: string): Promise<any[]>;
}

export const CAMPAIGN_LEAD_REPOSITORY = Symbol('CAMPAIGN_LEAD_REPOSITORY');

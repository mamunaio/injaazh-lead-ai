import { Campaign } from '../entities/campaign.entity';

export interface ICampaignRepository {
  create(organizationId: string, campaign: Partial<Campaign>): Promise<Campaign>;
  findById(organizationId: string, id: string): Promise<Campaign | null>;
  findByOrganization(organizationId: string): Promise<Campaign[]>;
  updateStatus(organizationId: string, id: string, status: Campaign['status']): Promise<Campaign | null>;
  update(organizationId: string, id: string, updates: Partial<Campaign>): Promise<Campaign | null>;
}

export const CAMPAIGN_REPOSITORY = Symbol('CAMPAIGN_REPOSITORY');

import { RawLead } from '../entities/raw-lead.entity';

export interface IRawLeadRepository {
  upsert(organizationId: string, rawLead: Partial<RawLead>): Promise<RawLead>;
  findByJobId(organizationId: string, scrapeJobId: string): Promise<RawLead[]>;
}

export const RAW_LEAD_REPOSITORY = Symbol('RAW_LEAD_REPOSITORY');

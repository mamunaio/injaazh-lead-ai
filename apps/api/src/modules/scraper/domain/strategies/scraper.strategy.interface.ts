import { RawLead } from '../entities/raw-lead.entity';

export interface IScraperStrategy {
  scrape(organizationId: string, scrapeJobId: string, parameters: any): Promise<Partial<RawLead>[]>;
}

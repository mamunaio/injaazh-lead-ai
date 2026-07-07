import { ScrapeJob } from '../entities/scrape-job.entity';

export interface IScrapeJobRepository {
  create(organizationId: string, job: Partial<ScrapeJob>): Promise<ScrapeJob>;
  findById(organizationId: string, id: string): Promise<ScrapeJob | null>;
  findByOrganization(organizationId: string): Promise<ScrapeJob[]>;
  update(organizationId: string, id: string, job: Partial<ScrapeJob>): Promise<ScrapeJob | null>;
  updateStatus(id: string, status: ScrapeJob['status'], progress?: number, resultCount?: number, error?: string): Promise<void>;
}

export const SCRAPE_JOB_REPOSITORY = Symbol('SCRAPE_JOB_REPOSITORY');

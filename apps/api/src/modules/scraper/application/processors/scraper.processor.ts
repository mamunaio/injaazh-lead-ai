import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import type { IScrapeJobRepository } from '../../domain/repositories/scrape-job.repository.interface';
import { SCRAPE_JOB_REPOSITORY } from '../../domain/repositories/scrape-job.repository.interface';
import type { IRawLeadRepository } from '../../domain/repositories/raw-lead.repository.interface';
import { RAW_LEAD_REPOSITORY } from '../../domain/repositories/raw-lead.repository.interface';
import { GoogleMapsScraper } from '../../domain/strategies/google-maps.scraper';
import { WebsiteScraper } from '../../domain/strategies/website.scraper';
import { LinkedInScraper } from '../../domain/strategies/linkedin.scraper';
import { CsvScraper } from '../../domain/strategies/csv.scraper';

@Processor('scraper')
export class ScraperProcessor extends WorkerHost {
  private readonly logger = new Logger(ScraperProcessor.name);

  constructor(
    @Inject(SCRAPE_JOB_REPOSITORY) private readonly scrapeJobRepo: IScrapeJobRepository,
    @Inject(RAW_LEAD_REPOSITORY) private readonly rawLeadRepo: IRawLeadRepository,
    private readonly googleMapsScraper: GoogleMapsScraper,
    private readonly websiteScraper: WebsiteScraper,
    private readonly linkedInScraper: LinkedInScraper,
    private readonly csvScraper: CsvScraper,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing Scrape Job ${job.id}`);
    
    const { organizationId, jobId } = job.data;
    
    await this.scrapeJobRepo.updateStatus(jobId, 'Processing', 0);
    const scrapeJob = await this.scrapeJobRepo.findById(organizationId, jobId);
    
    if (!scrapeJob) {
      this.logger.error(`Scrape Job ${jobId} not found`);
      return;
    }

    try {
      let rawLeads = [];
      
      switch (scrapeJob.type) {
        case 'GoogleMaps':
          rawLeads = await this.googleMapsScraper.scrape(organizationId, jobId, scrapeJob.parameters);
          break;
        case 'Website':
          rawLeads = await this.websiteScraper.scrape(organizationId, jobId, scrapeJob.parameters);
          break;
        case 'LinkedIn':
          rawLeads = await this.linkedInScraper.scrape(organizationId, jobId, scrapeJob.parameters);
          break;
        case 'CSV':
          rawLeads = await this.csvScraper.scrape(organizationId, jobId, scrapeJob.parameters);
          break;
        default:
          throw new Error(`Unknown scraper type: ${scrapeJob.type}`);
      }

      await this.scrapeJobRepo.updateStatus(jobId, 'Processing', 50);

      // Save raw leads with upsert for duplicate detection
      for (const lead of rawLeads) {
        await this.rawLeadRepo.upsert(organizationId, lead);
      }

      await this.scrapeJobRepo.updateStatus(jobId, 'Completed', 100, rawLeads.length);
      this.logger.log(`Scrape Job ${jobId} completed successfully`);

    } catch (error: any) {
      this.logger.error(`Scrape Job ${jobId} failed: ${error.message}`);
      await this.scrapeJobRepo.updateStatus(jobId, 'Failed', undefined, undefined, error.message);
      throw error; // Let BullMQ handle retries
    }
  }
}

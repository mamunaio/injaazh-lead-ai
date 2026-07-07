import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import type { IScrapeJobRepository } from '../../domain/repositories/scrape-job.repository.interface';
import { SCRAPE_JOB_REPOSITORY } from '../../domain/repositories/scrape-job.repository.interface';
import { CreateScrapeJobDto } from '../../presentation/dto/create-scrape-job.dto';

@Injectable()
export class ScraperManagerService {
  constructor(
    @Inject(SCRAPE_JOB_REPOSITORY) private readonly scrapeJobRepo: IScrapeJobRepository,
    @InjectQueue('scraper') private readonly scraperQueue: Queue,
  ) {}

  async queueJob(organizationId: string, dto: CreateScrapeJobDto) {
    // Save the job as Pending in the database
    const jobRecord = await this.scrapeJobRepo.create(organizationId, {
      type: dto.type as any,
      parameters: dto.parameters,
      status: 'Pending',
    });

    // Add it to BullMQ
    await this.scraperQueue.add('scrape-task', {
      organizationId,
      jobId: jobRecord.id,
    }, {
      attempts: 3, // Retry support
      backoff: { type: 'exponential', delay: 5000 },
    });

    return jobRecord;
  }

  async getJobStatus(organizationId: string, jobId: string) {
    const job = await this.scrapeJobRepo.findById(organizationId, jobId);
    if (!job) {
      throw new NotFoundException('Scrape Job not found');
    }
    return job;
  }
  
  async getJobsByOrganization(organizationId: string) {
    return this.scrapeJobRepo.findByOrganization(organizationId);
  }
}

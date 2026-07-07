import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bullmq';
import { ScraperController } from './scraper.controller';
import { ScraperManagerService } from './application/services/scraper.manager.service';
import { ScraperProcessor } from './application/processors/scraper.processor';
import { ScrapeJobRepository } from './infrastructure/repositories/scrape-job.repository';
import { RawLeadRepository } from './infrastructure/repositories/raw-lead.repository';
import { ScrapeJobSchema, ScrapeJobDocument } from './infrastructure/schemas/scrape-job.schema';
import { RawLeadSchema, RawLeadDocument } from './infrastructure/schemas/raw-lead.schema';
import { SCRAPE_JOB_REPOSITORY } from './domain/repositories/scrape-job.repository.interface';
import { RAW_LEAD_REPOSITORY } from './domain/repositories/raw-lead.repository.interface';
import { GoogleMapsScraper } from './domain/strategies/google-maps.scraper';
import { WebsiteScraper } from './domain/strategies/website.scraper';
import { LinkedInScraper } from './domain/strategies/linkedin.scraper';
import { CsvScraper } from './domain/strategies/csv.scraper';
import { ApolloScraper } from './domain/strategies/apollo.scraper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ScrapeJobDocument.name, schema: ScrapeJobSchema },
      { name: RawLeadDocument.name, schema: RawLeadSchema },
    ]),
    BullModule.registerQueue({
      name: 'scraper',
    }),
  ],
  controllers: [ScraperController],
  providers: [
    ScraperManagerService,
    ScraperProcessor,
    GoogleMapsScraper,
    WebsiteScraper,
    LinkedInScraper,
    CsvScraper,
    ApolloScraper,
    {
      provide: SCRAPE_JOB_REPOSITORY,
      useClass: ScrapeJobRepository,
    },
    {
      provide: RAW_LEAD_REPOSITORY,
      useClass: RawLeadRepository,
    },
  ],
  exports: [SCRAPE_JOB_REPOSITORY, RAW_LEAD_REPOSITORY],
})
export class ScraperModule {}

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { LeadsModule } from '../leads/leads.module';

import { EnrichmentController } from './presentation/enrichment.controller';
import { EnrichmentManagerService } from './application/services/enrichment-manager.service';
import { EnrichmentProcessor } from './application/processors/enrichment.processor';

import { AxiosWebCrawler } from './infrastructure/adapters/axios-web-crawler.adapter';
import { RegexTechDetector } from './infrastructure/adapters/regex-tech-detector.adapter';

import { DetectWebsiteStep } from './application/pipeline-steps/detect-website.step';
import { CrawlWebsiteStep } from './application/pipeline-steps/crawl-website.step';
import { ExtractDataStep } from './application/pipeline-steps/extract-data.step';
import { DetectTechnologiesStep } from './application/pipeline-steps/detect-technologies.step';
import { GenerateProfileStep } from './application/pipeline-steps/generate-profile.step';
import { StoreEnrichedDataStep } from './application/pipeline-steps/store-enriched-data.step';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'enrichment',
    }),
    LeadsModule,
  ],
  controllers: [EnrichmentController],
  providers: [
    EnrichmentManagerService,
    EnrichmentProcessor,

    // Adapters
    {
      provide: 'IWebCrawler',
      useClass: AxiosWebCrawler,
    },
    {
      provide: 'ITechDetector',
      useClass: RegexTechDetector,
    },

    // Pipeline Steps
    DetectWebsiteStep,
    CrawlWebsiteStep,
    ExtractDataStep,
    DetectTechnologiesStep,
    GenerateProfileStep,
    StoreEnrichedDataStep,
  ],
  exports: [EnrichmentManagerService],
})
export class EnrichmentModule {}

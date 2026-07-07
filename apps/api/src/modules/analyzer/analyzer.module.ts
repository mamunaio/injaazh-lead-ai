import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerManagerService } from './application/services/analyzer.manager.service';
import { AiAnalysisService } from './application/services/ai-analysis.service';
import { AnalyzerProcessor } from './application/processors/analyzer.processor';
import { LeadsModule } from '../leads/leads.module';
import { ScraperModule } from '../scraper/scraper.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'analyzer',
    }),
    LeadsModule, // exports ILeadRepository
    ScraperModule, // wait, ScraperModule doesn't export IRawLeadRepository yet. I need to fix that.
  ],
  controllers: [AnalyzerController],
  providers: [
    AnalyzerManagerService,
    AiAnalysisService,
    AnalyzerProcessor,
  ],
})
export class AnalyzerModule {}

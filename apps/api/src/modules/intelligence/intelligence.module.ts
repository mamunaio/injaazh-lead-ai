import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { LeadsModule } from '../leads/leads.module';

import { IntelligenceController } from './presentation/intelligence.controller';
import { IntelligenceManagerService } from './application/services/intelligence-manager.service';
import { IntelligenceProcessor } from './application/processors/intelligence.processor';

import { CompanyDetailsSynthesisStep } from './application/pipeline-steps/company-details.step';
import { DecisionMakerIdentificationStep } from './application/pipeline-steps/decision-maker.step';
import { TechSignalsStep } from './application/pipeline-steps/tech-signals.step';
import { PainPointsStep } from './application/pipeline-steps/pain-points.step';
import { ConfidenceScoringStep } from './application/pipeline-steps/confidence-scoring.step';
import { StoreIntelligenceStep } from './application/pipeline-steps/store-intelligence.step';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'intelligence',
    }),
    LeadsModule,
  ],
  controllers: [IntelligenceController],
  providers: [
    IntelligenceManagerService,
    IntelligenceProcessor,

    // Pipeline Steps
    CompanyDetailsSynthesisStep,
    DecisionMakerIdentificationStep,
    TechSignalsStep,
    PainPointsStep,
    ConfidenceScoringStep,
    StoreIntelligenceStep,
  ],
  exports: [IntelligenceManagerService],
})
export class IntelligenceModule {}

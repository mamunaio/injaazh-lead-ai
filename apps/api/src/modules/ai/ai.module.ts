import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AiController } from './ai.controller';
import { AiManagerService } from './application/services/ai.manager.service';
import { AiGenerationService } from './application/services/ai-generation.service';
import { AiProcessor } from './application/processors/ai.processor';
import { LeadsModule } from '../leads/leads.module';
import { LlmModule } from '../llm/llm.module';

import { AiContextController } from './presentation/ai-context.controller';
import { AiContextManagerService } from './application/services/ai-context-manager.service';
import { AiWebsiteAuditService } from './application/services/ai-website-audit.service';
import { AiLeadScoringService } from './application/services/ai-lead-scoring.service';
import { AiFollowupGeneratorService } from './application/services/ai-followup-generator.service';
import { AiSubjectOptimizerService } from './application/services/ai-subject-optimizer.service';
import { AiEmailAbTestingService } from './application/services/ai-email-ab-testing.service';
import { AiContextProcessor } from './application/processors/ai-context.processor';
import { ExtractLeadBaseStep } from './application/pipeline-steps/extract-lead-base.step';
import { ExtractCompanyProfileStep } from './application/pipeline-steps/extract-company-profile.step';
import { ExtractIntelligenceStep } from './application/pipeline-steps/extract-intelligence.step';
import { FinalizeContextStep } from './application/pipeline-steps/finalize-context.step';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'ai-generation',
    }),
    BullModule.registerQueue({
      name: 'ai-context',
    }),
    LeadsModule, // exports ILeadRepository
    LlmModule,
  ],
  controllers: [AiController, AiContextController],
  providers: [
    AiManagerService,
    AiWebsiteAuditService,
    AiLeadScoringService,
    AiFollowupGeneratorService,
    AiSubjectOptimizerService,
    AiEmailAbTestingService,
    AiGenerationService,
    AiProcessor,

    AiContextManagerService,
    AiContextProcessor,
    ExtractLeadBaseStep,
    ExtractCompanyProfileStep,
    ExtractIntelligenceStep,
    FinalizeContextStep,
  ],
  exports: [AiManagerService, AiContextManagerService],
})
export class AiModule {}

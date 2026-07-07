import { Module } from '@nestjs/common';
import { ImportController } from './presentation/import.controller';
import { ImportEngineService } from './application/services/import-engine.service';
import { LeadsModule } from '../leads/leads.module';

import { ManualSourceStrategy } from './infrastructure/strategies/manual-source.strategy';
import { CsvSourceStrategy } from './infrastructure/strategies/csv-source.strategy';
import { GoogleMapsSourceStrategy } from './infrastructure/strategies/google-maps-source.strategy';
import { ApolloSourceStrategy } from './infrastructure/strategies/apollo-source.strategy';
import { LinkedinSourceStrategy } from './infrastructure/strategies/linkedin-source.strategy';
import { ApiSourceStrategy } from './infrastructure/strategies/api-source.strategy';

import { ValidationStep } from './application/pipeline-steps/validation.step';
import { NormalizationStep } from './application/pipeline-steps/normalization.step';
import { DuplicateDetectionStep } from './application/pipeline-steps/duplicate-detection.step';
import { OrganizationAssignmentStep } from './application/pipeline-steps/organization-assignment.step';
import { QueueReadyStep } from './application/pipeline-steps/queue-ready.step';
import { SaveLeadStep } from './application/pipeline-steps/save-lead.step';
import { AuditLogStep } from './application/pipeline-steps/audit-log.step';

@Module({
  imports: [LeadsModule],
  controllers: [ImportController],
  providers: [
    ImportEngineService,

    // Strategies
    ManualSourceStrategy,
    CsvSourceStrategy,
    GoogleMapsSourceStrategy,
    ApolloSourceStrategy,
    LinkedinSourceStrategy,
    ApiSourceStrategy,

    // Pipeline Steps
    ValidationStep,
    NormalizationStep,
    DuplicateDetectionStep,
    OrganizationAssignmentStep,
    QueueReadyStep,
    SaveLeadStep,
    AuditLogStep,
  ],
  exports: [ImportEngineService],
})
export class ImportModule {}

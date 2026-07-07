import { Injectable, Logger } from '@nestjs/common';
import { ImportContext } from '../../domain/entities/import-context.entity';
import { SourceType } from '../../domain/types/source-type.enum';
import { ILeadSourceStrategy } from '../../domain/interfaces/source-strategy.interface';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';

import { ManualSourceStrategy } from '../../infrastructure/strategies/manual-source.strategy';
import { CsvSourceStrategy } from '../../infrastructure/strategies/csv-source.strategy';
import { GoogleMapsSourceStrategy } from '../../infrastructure/strategies/google-maps-source.strategy';
import { ApolloSourceStrategy } from '../../infrastructure/strategies/apollo-source.strategy';
import { LinkedinSourceStrategy } from '../../infrastructure/strategies/linkedin-source.strategy';
import { ApiSourceStrategy } from '../../infrastructure/strategies/api-source.strategy';

import { ValidationStep } from '../pipeline-steps/validation.step';
import { NormalizationStep } from '../pipeline-steps/normalization.step';
import { DuplicateDetectionStep } from '../pipeline-steps/duplicate-detection.step';
import { OrganizationAssignmentStep } from '../pipeline-steps/organization-assignment.step';
import { QueueReadyStep } from '../pipeline-steps/queue-ready.step';
import { SaveLeadStep } from '../pipeline-steps/save-lead.step';
import { AuditLogStep } from '../pipeline-steps/audit-log.step';

@Injectable()
export class ImportEngineService {
  private readonly logger = new Logger(ImportEngineService.name);
  private readonly strategies: Map<SourceType, ILeadSourceStrategy>;
  private readonly pipeline: IImportPipelineStep[];

  constructor(
    manualStrategy: ManualSourceStrategy,
    csvStrategy: CsvSourceStrategy,
    googleMapsStrategy: GoogleMapsSourceStrategy,
    apolloStrategy: ApolloSourceStrategy,
    linkedinStrategy: LinkedinSourceStrategy,
    apiStrategy: ApiSourceStrategy,

    validationStep: ValidationStep,
    normalizationStep: NormalizationStep,
    duplicateDetectionStep: DuplicateDetectionStep,
    orgAssignmentStep: OrganizationAssignmentStep,
    queueReadyStep: QueueReadyStep,
    saveLeadStep: SaveLeadStep,
    auditLogStep: AuditLogStep,
  ) {
    this.strategies = new Map<SourceType, ILeadSourceStrategy>([
      [SourceType.MANUAL, manualStrategy],
      [SourceType.CSV, csvStrategy],
      [SourceType.GOOGLE_MAPS, googleMapsStrategy],
      [SourceType.APOLLO, apolloStrategy],
      [SourceType.LINKEDIN, linkedinStrategy],
      [SourceType.API, apiStrategy],
    ]);

    // Define the order of the pipeline
    this.pipeline = [
      validationStep,
      normalizationStep,
      duplicateDetectionStep,
      orgAssignmentStep,
      queueReadyStep,
      saveLeadStep,
      auditLogStep,
    ];
  }

  /**
   * Processes a raw payload from a specific source for a given organization.
   * Returns the contexts of all processed leads.
   */
  async processImport(organizationId: string, sourceType: SourceType, rawPayload: any): Promise<ImportContext[]> {
    const strategy = this.strategies.get(sourceType);
    if (!strategy) {
      throw new Error(`Unsupported source type: ${sourceType}`);
    }

    // 1. Map raw source payload to standard internal format
    const rawLeads = await strategy.mapPayload(rawPayload);
    const results: ImportContext[] = [];

    // 2. Process each lead through the pipeline
    for (const rawLead of rawLeads) {
      let context = new ImportContext(organizationId, rawLead);

      for (const step of this.pipeline) {
        context = await step.process(context);
        if (context.isFailed()) {
          // If a step fails, we might still want to run AuditLogStep
          // So we could break here and ensure AuditLog is always run at the end.
          // For simplicity, we break out of the main steps but run audit.
          break; 
        }
      }
      
      // Ensure AuditLog runs even if it broke early
      if (context.isFailed()) {
        const auditStep = this.pipeline[this.pipeline.length - 1]; // AuditLogStep is last
        await auditStep.process(context);
      }

      results.push(context);
    }

    return results;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';

@Injectable()
export class AuditLogStep implements IImportPipelineStep {
  private readonly logger = new Logger(AuditLogStep.name);

  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) {
      this.logger.warn(
        `Import failed for org [${context.organizationId}] from source [${context.rawPayload.source}]. Errors: ${context.errors.join(', ')}`
      );
    } else {
      this.logger.log(
        `Import success for org [${context.organizationId}]. Saved Lead ID: ${context.savedLeadId}`
      );
    }
    
    // In a real application, you might save an AuditLogEntity here.
    return context;
  }
}

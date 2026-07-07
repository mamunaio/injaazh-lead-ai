import { Injectable } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';

@Injectable()
export class OrganizationAssignmentStep implements IImportPipelineStep {
  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) return context;

    // Explicitly attach the context's organizationId to the normalized lead data 
    // to ensure it never gets crossed with another tenant.
    if (!context.organizationId) {
      context.addError('Missing organization context for import.');
      return context;
    }

    // Usually, the LeadRepository requires organizationId as a separate parameter,
    // but setting it on metadata or verifying it here ensures safety.
    context.normalizedLead.metadata = {
      ...context.normalizedLead.metadata,
      assignedOrganizationId: context.organizationId,
    };

    return context;
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class DuplicateDetectionStep implements IImportPipelineStep {
  constructor(
    @Inject(LEAD_REPOSITORY)
    private readonly leadRepository: ILeadRepository,
  ) {}

  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) return context;

    const lead = context.normalizedLead;
    if (lead.email) {
      const existing = await this.leadRepository.findByEmail(context.organizationId, lead.email);
      if (existing) {
        context.addError(`Duplicate lead found with email: ${lead.email}`);
      }
    }
    
    // We can also add domain-based duplicate checking if needed.
    // For now, email is the primary unique identifier.

    return context;
  }
}

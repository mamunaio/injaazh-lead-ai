import { Injectable, Inject } from '@nestjs/common';
import { IImportPipelineStep } from '../../domain/interfaces/import-step.interface';
import { ImportContext } from '../../domain/entities/import-context.entity';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class SaveLeadStep implements IImportPipelineStep {
  constructor(
    @Inject(LEAD_REPOSITORY)
    private readonly leadRepository: ILeadRepository,
  ) {}

  async process(context: ImportContext): Promise<ImportContext> {
    if (context.isFailed()) return context;

    try {
      const savedLead = await this.leadRepository.create(
        context.organizationId,
        {
          firstName: context.normalizedLead.firstName || 'Unknown',
          lastName: context.normalizedLead.lastName || null,
          email: context.normalizedLead.email || null,
          phone: context.normalizedLead.phone || null,
          source: context.normalizedLead.source || 'Manual',
        } as any
      );
      
      context.savedLeadId = savedLead.id;
      context.status = 'Success';
    } catch (error: any) {
      context.addError(`Failed to save lead: ${error.message}`);
    }

    return context;
  }
}

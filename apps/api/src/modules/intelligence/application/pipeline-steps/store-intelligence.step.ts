import { Injectable, Inject } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class StoreIntelligenceStep implements IIntelligenceStep {
  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: ILeadRepository,
  ) {}

  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    try {
      const updateData = {
        prospectIntelligence: {
          ...context.prospectIntelligence,
          analyzedAt: new Date().toISOString(),
        },
      };

      await this.leadRepository.update(context.organizationId, context.leadId, updateData);
      context.status = 'Success';
    } catch (error: any) {
      context.addError(`Failed to save prospect intelligence data: ${error.message}`);
    }

    return context;
  }
}

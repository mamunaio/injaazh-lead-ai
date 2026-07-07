import { Injectable, Inject } from '@nestjs/common';
import { IContextBuilderStep } from '../../domain/interfaces/context-builder-step.interface';
import { ContextBuilderState } from '../../domain/entities/context-builder-state.entity';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class FinalizeContextStep implements IContextBuilderStep {
  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: ILeadRepository,
  ) {}

  async process(state: ContextBuilderState): Promise<ContextBuilderState> {
    if (state.isFailed()) return state;

    try {
      const updateData = {
        aiContext: state.aiContext,
      };

      await this.leadRepository.update(state.organizationId, state.leadId, updateData);
      state.status = 'Success';
    } catch (error: any) {
      state.addError(`Failed to save AI Context data: ${error.message}`);
    }

    return state;
  }
}

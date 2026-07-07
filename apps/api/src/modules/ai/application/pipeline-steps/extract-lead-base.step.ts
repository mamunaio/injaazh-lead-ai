import { Injectable } from '@nestjs/common';
import { IContextBuilderStep } from '../../domain/interfaces/context-builder-step.interface';
import { ContextBuilderState } from '../../domain/entities/context-builder-state.entity';

@Injectable()
export class ExtractLeadBaseStep implements IContextBuilderStep {
  async process(state: ContextBuilderState): Promise<ContextBuilderState> {
    if (state.isFailed()) return state;

    state.aiContext.outreachGoal = state.outreachGoal;
    
    // We already know the decision maker's basic info from the raw lead, 
    // we'll set it here and possibly override it in later steps if intelligence is richer.
    state.aiContext.decisionMaker.name = state.leadDocument.firstName 
      ? `${state.leadDocument.firstName} ${state.leadDocument.lastName || ''}`.trim()
      : null;

    return state;
  }
}

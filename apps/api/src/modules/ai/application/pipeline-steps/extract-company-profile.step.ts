import { Injectable } from '@nestjs/common';
import { IContextBuilderStep } from '../../domain/interfaces/context-builder-step.interface';
import { ContextBuilderState } from '../../domain/entities/context-builder-state.entity';

@Injectable()
export class ExtractCompanyProfileStep implements IContextBuilderStep {
  async process(state: ContextBuilderState): Promise<ContextBuilderState> {
    if (state.isFailed()) return state;

    const enrichment = state.leadDocument.websiteAnalysis || {};
    
    // We try to pull from the enrichment engine's raw output
    state.aiContext.companySummary = enrichment.description || enrichment.title || '';
    
    return state;
  }
}

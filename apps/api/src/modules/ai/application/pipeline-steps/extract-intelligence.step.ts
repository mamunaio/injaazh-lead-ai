import { Injectable } from '@nestjs/common';
import { IContextBuilderStep } from '../../domain/interfaces/context-builder-step.interface';
import { ContextBuilderState } from '../../domain/entities/context-builder-state.entity';

@Injectable()
export class ExtractIntelligenceStep implements IContextBuilderStep {
  async process(state: ContextBuilderState): Promise<ContextBuilderState> {
    if (state.isFailed()) return state;

    const intel = state.leadDocument.prospectIntelligence || {};

    // Override or fill in missing fields from intelligence engine
    if (intel.companyDetails) {
      state.aiContext.industry = intel.companyDetails.industry || '';
      state.aiContext.companySize = intel.companyDetails.size || '';
      
      // Override summary if intelligence has a better description
      if (intel.companyDetails.description) {
        state.aiContext.companySummary = intel.companyDetails.description;
      }
    }

    if (intel.decisionMaker) {
      state.aiContext.decisionMaker.name = intel.decisionMaker.name || state.aiContext.decisionMaker.name;
      state.aiContext.decisionMaker.title = intel.decisionMaker.title || state.aiContext.decisionMaker.title;
    }

    state.aiContext.painPoints = intel.painPoints || [];
    state.aiContext.buyingSignals = intel.buyingSignals || [];
    state.aiContext.technologyStack = intel.technologyStack || [];
    state.aiContext.confidenceScore = intel.confidenceScore || 0;

    return state;
  }
}

import { Injectable } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';

@Injectable()
export class ConfidenceScoringStep implements IIntelligenceStep {
  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    const intel = context.prospectIntelligence;
    let score = 0;

    // Base data
    if (intel.decisionMaker.name) score += 20;
    if (intel.decisionMaker.title) score += 10;
    
    // Contactability
    if (intel.decisionMaker.emails.length > 0) score += 30;
    if (intel.decisionMaker.linkedInUrl) score += 20;

    // Richness
    if (intel.technologyStack.length > 0) score += 10;
    if (intel.companyDetails.description !== 'No description available') score += 10;

    context.prospectIntelligence.confidenceScore = Math.min(score, 100);

    return context;
  }
}

import { Injectable } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';

@Injectable()
export class TechSignalsStep implements IIntelligenceStep {
  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    const techStack = context.rawEnrichmentData?.websiteAnalysis?.technologies || [];
    context.prospectIntelligence.technologyStack = techStack;

    // Rule-based buying signals based on tech
    const signals: string[] = [];
    
    if (techStack.includes('Shopify') || techStack.includes('WooCommerce')) {
      signals.push('E-commerce operations detected');
    }
    
    if (techStack.includes('Google Analytics')) {
      signals.push('Actively tracking web traffic');
    }

    if (techStack.includes('React') || techStack.includes('Next.js')) {
      signals.push('Modern web application stack');
    }

    context.prospectIntelligence.buyingSignals = signals;

    return context;
  }
}

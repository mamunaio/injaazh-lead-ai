import { Injectable } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';

@Injectable()
export class CompanyDetailsSynthesisStep implements IIntelligenceStep {
  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    // Use enrichment data if available, fallback to raw lead data, otherwise defaults
    const rawEnrichment = context.rawEnrichmentData?.websiteAnalysis || {};
    const rawLead = context.rawLead || {};

    context.prospectIntelligence.companyDetails = {
      size: rawLead.companySize || 'Unknown',
      industry: rawLead.industry || 'Software & Technology', // Default fallback for SaaS
      location: rawLead.location || 'Unknown',
      description: rawEnrichment.description || rawEnrichment.title || 'No description available',
    };

    return context;
  }
}

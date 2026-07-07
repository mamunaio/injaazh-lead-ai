import { Injectable } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';

@Injectable()
export class GenerateProfileStep implements IEnrichmentStep {
  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed()) return context;

    // As per requirements: "No AI integration yet". 
    // This step will just map the extracted data into a structured company profile format.
    context.companyProfile = {
      name: context.extractedData.title,
      description: context.extractedData.metaDescription,
      industry: 'Unknown', // To be filled by AI later
      technologies: context.technologies,
      contact: {
        emails: context.extractedData.emails,
        phones: context.extractedData.phoneNumbers,
        socials: context.extractedData.socialLinks,
      },
      website: context.websiteUrl,
      lastEnriched: new Date().toISOString(),
    };

    return context;
  }
}

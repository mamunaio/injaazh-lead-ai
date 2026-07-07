import { Injectable } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';

@Injectable()
export class DetectWebsiteStep implements IEnrichmentStep {
  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed()) return context;

    // 1. Use initial domain if provided
    if (context.initialDomain) {
      context.websiteUrl = this.formatUrl(context.initialDomain);
      return context;
    }

    // 2. Try to guess domain from email
    if (context.initialEmail) {
      const parts = context.initialEmail.split('@');
      if (parts.length === 2) {
        const domain = parts[1];
        // Exclude common public providers
        const publicProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
        if (!publicProviders.includes(domain.toLowerCase())) {
          context.websiteUrl = this.formatUrl(domain);
          return context;
        }
      }
    }

    context.addError('Could not detect a business website URL.');
    return context;
  }

  private formatUrl(domain: string): string {
    let url = domain.trim().toLowerCase();
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }
    return url;
  }
}

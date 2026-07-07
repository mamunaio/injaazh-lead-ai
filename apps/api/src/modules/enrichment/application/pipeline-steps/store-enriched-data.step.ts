import { Injectable, Inject } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class StoreEnrichedDataStep implements IEnrichmentStep {
  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: ILeadRepository,
  ) {}

  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed()) return context;

    try {
      const updateData = {
        websiteAnalysis: {
          url: context.websiteUrl,
          technologies: context.technologies,
          crawledAt: new Date().toISOString(),
          title: context.extractedData.title,
          description: context.extractedData.metaDescription,
        },
        // Wait, company profile is not natively in Lead entity, maybe metadata or aiOutreach placeholder
        aiOutreach: {
          ...context.companyProfile,
          generatedAt: new Date().toISOString(),
        }
      };

      await this.leadRepository.update(context.organizationId, context.leadId, updateData);
      context.status = 'Success';
    } catch (error: any) {
      context.addError(`Failed to save enriched data: ${error.message}`);
    }

    return context;
  }
}

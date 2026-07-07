import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';
import { DetectWebsiteStep } from '../pipeline-steps/detect-website.step';
import { CrawlWebsiteStep } from '../pipeline-steps/crawl-website.step';
import { ExtractDataStep } from '../pipeline-steps/extract-data.step';
import { DetectTechnologiesStep } from '../pipeline-steps/detect-technologies.step';
import { GenerateProfileStep } from '../pipeline-steps/generate-profile.step';
import { StoreEnrichedDataStep } from '../pipeline-steps/store-enriched-data.step';

@Processor('enrichment')
export class EnrichmentProcessor extends WorkerHost {
  private readonly logger = new Logger(EnrichmentProcessor.name);

  constructor(
    private readonly detectWebsiteStep: DetectWebsiteStep,
    private readonly crawlWebsiteStep: CrawlWebsiteStep,
    private readonly extractDataStep: ExtractDataStep,
    private readonly detectTechStep: DetectTechnologiesStep,
    private readonly generateProfileStep: GenerateProfileStep,
    private readonly storeDataStep: StoreEnrichedDataStep,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, leadId, initialDomain, initialEmail } = job.data;
    
    this.logger.log(`Starting enrichment for Lead ${leadId}`);

    let context = new EnrichmentContext(organizationId, leadId, initialDomain, initialEmail);

    const steps = [
      this.detectWebsiteStep,
      this.crawlWebsiteStep,
      this.extractDataStep,
      this.detectTechStep,
      this.generateProfileStep,
      this.storeDataStep,
    ];

    for (const step of steps) {
      context = await step.process(context);
      if (context.isFailed()) {
        this.logger.warn(`Enrichment halted for Lead ${leadId}. Errors: ${context.errors.join(', ')}`);
        break;
      }
    }

    if (!context.isFailed()) {
      this.logger.log(`Enrichment completed successfully for Lead ${leadId}`);
    }

    return { status: context.status, errors: context.errors };
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { IEnrichmentStep } from '../../domain/interfaces/enrichment-step.interface';
import { EnrichmentContext } from '../../domain/entities/enrichment-context.entity';
import type { ITechDetector } from '../../domain/interfaces/tech-detector.interface';

@Injectable()
export class DetectTechnologiesStep implements IEnrichmentStep {
  constructor(
    @Inject('ITechDetector') private readonly techDetector: ITechDetector,
  ) {}

  async process(context: EnrichmentContext): Promise<EnrichmentContext> {
    if (context.isFailed() || !context.crawledHtml) return context;

    context.technologies = this.techDetector.detect(context.crawledHtml);
    return context;
  }
}

import { EnrichmentContext } from '../entities/enrichment-context.entity';

export interface IEnrichmentStep {
  process(context: EnrichmentContext): Promise<EnrichmentContext>;
}

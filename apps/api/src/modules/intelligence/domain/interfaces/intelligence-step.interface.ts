import { IntelligenceContext } from '../entities/intelligence-context.entity';

export interface IIntelligenceStep {
  process(context: IntelligenceContext): Promise<IntelligenceContext>;
}

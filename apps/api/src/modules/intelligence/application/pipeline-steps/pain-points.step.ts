import { Injectable } from '@nestjs/common';
import { IIntelligenceStep } from '../../domain/interfaces/intelligence-step.interface';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';

@Injectable()
export class PainPointsStep implements IIntelligenceStep {
  async process(context: IntelligenceContext): Promise<IntelligenceContext> {
    if (context.isFailed()) return context;

    const { industry } = context.prospectIntelligence.companyDetails;
    const painPoints: string[] = [];

    // Rule-based pain point generation (no LLM yet)
    switch (industry.toLowerCase()) {
      case 'e-commerce':
        painPoints.push('Cart abandonment rates');
        painPoints.push('Customer acquisition costs');
        break;
      case 'software & technology':
      case 'saas':
        painPoints.push('High churn rate');
        painPoints.push('User onboarding friction');
        break;
      case 'marketing':
        painPoints.push('Lead quality and conversion');
        painPoints.push('Proving ROI to clients');
        break;
      default:
        painPoints.push('Scaling operations efficiently');
        painPoints.push('Automating manual workflows');
    }

    context.prospectIntelligence.painPoints = painPoints;
    return context;
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { IntelligenceContext } from '../../domain/entities/intelligence-context.entity';
import { CompanyDetailsSynthesisStep } from '../pipeline-steps/company-details.step';
import { DecisionMakerIdentificationStep } from '../pipeline-steps/decision-maker.step';
import { TechSignalsStep } from '../pipeline-steps/tech-signals.step';
import { PainPointsStep } from '../pipeline-steps/pain-points.step';
import { ConfidenceScoringStep } from '../pipeline-steps/confidence-scoring.step';
import { StoreIntelligenceStep } from '../pipeline-steps/store-intelligence.step';

@Processor('intelligence')
export class IntelligenceProcessor extends WorkerHost {
  private readonly logger = new Logger(IntelligenceProcessor.name);

  constructor(
    private readonly companyDetailsStep: CompanyDetailsSynthesisStep,
    private readonly decisionMakerStep: DecisionMakerIdentificationStep,
    private readonly techSignalsStep: TechSignalsStep,
    private readonly painPointsStep: PainPointsStep,
    private readonly confidenceScoringStep: ConfidenceScoringStep,
    private readonly storeIntelligenceStep: StoreIntelligenceStep,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, leadId, rawLead, rawEnrichmentData } = job.data;
    
    this.logger.log(`Starting intelligence generation for Lead ${leadId}`);

    let context = new IntelligenceContext(organizationId, leadId, rawLead, rawEnrichmentData);

    const steps = [
      this.companyDetailsStep,
      this.decisionMakerStep,
      this.techSignalsStep,
      this.painPointsStep,
      this.confidenceScoringStep,
      this.storeIntelligenceStep,
    ];

    for (const step of steps) {
      context = await step.process(context);
      if (context.isFailed()) {
        this.logger.warn(`Intelligence generation halted for Lead ${leadId}. Errors: ${context.errors.join(', ')}`);
        break;
      }
    }

    if (!context.isFailed()) {
      this.logger.log(`Intelligence generation completed successfully for Lead ${leadId}`);
    }

    return { status: context.status, errors: context.errors };
  }
}

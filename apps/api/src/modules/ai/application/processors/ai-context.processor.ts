import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ContextBuilderState } from '../../domain/entities/context-builder-state.entity';
import { ExtractLeadBaseStep } from '../pipeline-steps/extract-lead-base.step';
import { ExtractCompanyProfileStep } from '../pipeline-steps/extract-company-profile.step';
import { ExtractIntelligenceStep } from '../pipeline-steps/extract-intelligence.step';
import { FinalizeContextStep } from '../pipeline-steps/finalize-context.step';
import { Inject } from '@nestjs/common';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Processor('ai-context')
export class AiContextProcessor extends WorkerHost {
  private readonly logger = new Logger(AiContextProcessor.name);

  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: ILeadRepository,
    private readonly extractLeadBaseStep: ExtractLeadBaseStep,
    private readonly extractCompanyProfileStep: ExtractCompanyProfileStep,
    private readonly extractIntelligenceStep: ExtractIntelligenceStep,
    private readonly finalizeContextStep: FinalizeContextStep,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, leadId, outreachGoal } = job.data;
    
    this.logger.log(`Starting AI context generation for Lead ${leadId}`);

    const leadDocument = await this.leadRepository.findById(organizationId, leadId);
    if (!leadDocument) {
      throw new Error(`Lead ${leadId} not found`);
    }

    let state = new ContextBuilderState(organizationId, leadId, leadDocument, outreachGoal);

    const steps = [
      this.extractLeadBaseStep,
      this.extractCompanyProfileStep,
      this.extractIntelligenceStep,
      this.finalizeContextStep,
    ];

    for (const step of steps) {
      state = await step.process(state);
      if (state.isFailed()) {
        this.logger.warn(`AI context generation halted for Lead ${leadId}. Errors: ${state.errors.join(', ')}`);
        break;
      }
    }

    if (!state.isFailed()) {
      this.logger.log(`AI context generation completed successfully for Lead ${leadId}`);
    }

    return { status: state.status, errors: state.errors };
  }
}

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Inject, Logger } from '@nestjs/common';
import { AiGenerationService } from '../services/ai-generation.service';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';

@Processor('ai-generation')
export class AiProcessor extends WorkerHost {
  private readonly logger = new Logger(AiProcessor.name);

  constructor(
    @Inject(LEAD_REPOSITORY) private readonly leadRepo: ILeadRepository,
    private readonly aiService: AiGenerationService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { organizationId, leadId } = job.data;
    this.logger.log(`Processing AI Generation for Lead ${leadId}`);

    try {
      const lead = await this.leadRepo.findById(organizationId, leadId);
      if (!lead) {
        this.logger.warn(`Lead ${leadId} not found. Skipping.`);
        return;
      }

      if (!lead.websiteAnalysis) {
        this.logger.warn(`Lead ${leadId} has no website analysis. Skipping AI generation.`);
        return;
      }

      const aiOutreach = await this.aiService.generateOutreach(lead);

      await this.leadRepo.update(organizationId, leadId, {
        aiOutreach,
      } as any);

      this.logger.log(`AI Generation complete for Lead ${leadId}`);
    } catch (error: any) {
      this.logger.error(`AI Generation failed for Lead ${leadId}: ${error.message}`);
      throw error;
    }
  }
}

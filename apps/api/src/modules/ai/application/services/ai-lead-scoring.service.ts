import { Injectable, Logger, NotFoundException, Inject } from '@nestjs/common';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';
import { Lead } from '../../../leads/domain/entities/lead.entity';

export interface LeadScoreResult {
  score: number;
  reasoning: string;
}

@Injectable()
export class AiLeadScoringService {
  private readonly logger = new Logger(AiLeadScoringService.name);

  constructor(
    @Inject(LEAD_REPOSITORY)
    private readonly leadRepository: ILeadRepository,
    private readonly llmEngine: LlmEngineService,
  ) {}

  async scoreLead(organizationId: string, leadId: string, icpContext: string): Promise<Lead> {
    this.logger.log(`Scoring lead ${leadId} against ICP`);

    const lead = await this.leadRepository.findById(organizationId, leadId);
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    // Build the lead profile for the LLM
    const profile = {
      firstName: lead.firstName,
      lastName: lead.lastName,
      jobTitle: lead.prospectIntelligence?.decisionMaker?.title || 'Unknown',
      companyDescription: lead.prospectIntelligence?.companyDetails?.description || 'Unknown',
      industry: lead.prospectIntelligence?.companyDetails?.industry || 'Unknown',
      technologies: lead.prospectIntelligence?.technologyStack || [],
    };

    const prompt = `
      You are an expert B2B sales strategist and lead qualifier.
      I will provide you with an Ideal Customer Profile (ICP) and a Lead Profile.
      
      Ideal Customer Profile (ICP):
      ---
      ${icpContext}
      ---
      
      Lead Profile:
      ---
      ${JSON.stringify(profile, null, 2)}
      ---
      
      Based on this information, evaluate how well this lead fits the ICP.
      You must output the result as a raw JSON object (do not wrap it in markdown code blocks) matching the following interface:
      {
        "score": <integer from 0 to 100 representing the fit>,
        "reasoning": "A 1-2 sentence explanation of why this score was assigned based on the lead's profile compared to the ICP."
      }
    `;

    this.logger.log(`Sending lead profile to LLM for scoring...`);
    
    let result: LeadScoreResult | null = null;
    try {
      result = await this.llmEngine.generateJson<LeadScoreResult>(prompt);
    } catch (error: any) {
      this.logger.error(`Failed to generate lead score: ${error.message}`);
    }

    if (!result) {
      this.logger.warn(`Could not generate AI score for lead ${leadId}. Falling back to default values.`);
      result = {
        score: 0,
        reasoning: 'Failed to generate AI score.',
      };
    }

    // Save the score back to the lead entity
    const aiContext = lead.aiContext || {};
    aiContext.leadScore = result.score;
    aiContext.leadScoreReasoning = result.reasoning;
    aiContext.scoredAt = new Date().toISOString();
    aiContext.icpContextUsed = icpContext;

    lead.aiContext = aiContext;

    await this.leadRepository.update(organizationId, leadId, lead);
    
    this.logger.log(`Lead ${leadId} scored successfully: ${result.score}`);
    return lead;
  }
}

import { Injectable, Logger, NotFoundException, Inject } from '@nestjs/common';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';

export interface FollowupGenerationResult {
  subject: string;
  body: string;
}

@Injectable()
export class AiFollowupGeneratorService {
  private readonly logger = new Logger(AiFollowupGeneratorService.name);

  constructor(
    @Inject(LEAD_REPOSITORY)
    private readonly leadRepository: ILeadRepository,
    private readonly llmEngine: LlmEngineService,
  ) {}

  async generateFollowup(
    organizationId: string, 
    leadId: string, 
    previousEmail: string, 
    followupType: string = 'Bump'
  ): Promise<FollowupGenerationResult> {
    this.logger.log(`Generating followup for lead ${leadId} of type ${followupType}`);

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
    };

    const prompt = `
      You are an expert B2B sales copywriter.
      Your task is to write a highly converting follow-up email.
      
      Here is the Lead Profile:
      ---
      ${JSON.stringify(profile, null, 2)}
      ---
      
      Here is the Previous Email sent to this lead:
      ---
      ${previousEmail}
      ---
      
      Strategy/Type of Follow-up requested: ${followupType}
      (If this says "Bump", just bump the email. If "Value Add", provide extra value. If "Breakup", make it a breakup email).
      
      Write the follow-up email.
      If the subject line should remain the same (threading), output "Re: [Original Subject]" or something similar.
      Do not include placeholders you cannot fill (like [Your Name]). Make it sound natural and human.
      
      You must output the result as a raw JSON object matching the following interface:
      {
        "subject": "The email subject line.",
        "body": "The plain text body of the follow-up email."
      }
    `;

    this.logger.log(`Sending followup request to LLM...`);
    
    let result: FollowupGenerationResult | null = null;
    try {
      result = await this.llmEngine.generateJson<FollowupGenerationResult>(prompt);
    } catch (error: any) {
      this.logger.error(`Failed to generate followup email: ${error.message}`);
    }

    if (!result) {
      this.logger.warn(`Could not generate AI followup for lead ${leadId}.`);
      throw new Error('The AI engine failed to generate a valid follow-up email.');
    }
    
    this.logger.log(`Followup generated successfully for lead ${leadId}`);
    return result;
  }
}

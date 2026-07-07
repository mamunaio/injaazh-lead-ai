import { Injectable, Logger } from '@nestjs/common';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';

export interface EmailVariant {
  subject: string;
  body: string;
  explanation: string;
}

export interface EmailAbTestingResult {
  variations: EmailVariant[];
}

@Injectable()
export class AiEmailAbTestingService {
  private readonly logger = new Logger(AiEmailAbTestingService.name);

  constructor(
    private readonly llmEngine: LlmEngineService,
  ) {}

  async generateVariants(
    originalEmail: string,
    strategy: string,
    count: number = 2
  ): Promise<EmailAbTestingResult> {
    this.logger.log(`Generating ${count} A/B testing variants for strategy: ${strategy}`);
    
    const maxCount = Math.min(count, 3); // Hard limit to 3 variations

    const prompt = `
      You are an expert B2B cold email copywriter and growth hacker.
      Your task is to generate A/B test variations for an existing cold email.
      
      Original Email:
      ---
      ${originalEmail}
      ---
      
      A/B Testing Strategy/Goal: ${strategy}
      
      Based on the strategy, rewrite the email to create ${maxCount} distinct variations.
      Each variation should have a subject line, the full email body, and a brief 1-2 sentence explanation of what was changed and why it might perform better based on the strategy.
      
      You must output the result as a raw JSON object matching the following interface:
      {
        "variations": [
          {
            "subject": "The email subject line for this variant",
            "body": "The full plain text body of the email variant",
            "explanation": "Why this variant was written this way to match the strategy"
          }
        ]
      }
    `;

    this.logger.log(`Sending A/B testing request to LLM...`);
    
    let result: EmailAbTestingResult | null = null;
    try {
      result = await this.llmEngine.generateJson<EmailAbTestingResult>(prompt);
    } catch (error: any) {
      this.logger.error(`Failed to generate email variations: ${error.message}`);
    }

    if (!result || !result.variations) {
      this.logger.warn(`Could not generate AI variations. Returning default fallback.`);
      return {
        variations: [
          { 
            subject: "Fallback variation", 
            body: originalEmail, 
            explanation: "Failed to generate AI variation. This is the original email." 
          }
        ]
      };
    }
    
    this.logger.log(`Email variations generated successfully.`);
    return result;
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';

export interface SubjectVariation {
  subject: string;
  angle: string;
}

export interface SubjectOptimizationResult {
  variations: SubjectVariation[];
}

@Injectable()
export class AiSubjectOptimizerService {
  private readonly logger = new Logger(AiSubjectOptimizerService.name);

  constructor(
    private readonly llmEngine: LlmEngineService,
  ) {}

  async optimizeSubject(
    emailBody: string,
    originalSubject?: string,
    tone?: string
  ): Promise<SubjectOptimizationResult> {
    this.logger.log(`Optimizing subject line...`);

    let prompt = `
      You are an expert B2B cold email copywriter whose sole goal is to maximize open rates.
      I am providing you with the body of a cold email.
      Your task is to generate 3 to 5 highly optimized, short, and catchy subject lines for this email.
      
      Email Body:
      ---
      ${emailBody}
      ---
    `;

    if (originalSubject) {
      prompt += `
      The user drafted this initial subject line: "${originalSubject}"
      Improve upon this or provide better alternatives.
      `;
    }

    if (tone) {
      prompt += `
      The desired tone/strategy for these subject lines is: "${tone}".
      `;
    }

    prompt += `
      Best practices for cold email subject lines:
      - Keep it short (2-5 words is ideal).
      - Do not use clickbait or spammy words.
      - Create curiosity or highlight a specific value/pain point.
      - Make it look like an internal email (e.g. lowercase first letters often work well).
      
      You must output the result as a raw JSON object matching the following interface:
      {
        "variations": [
          {
            "subject": "The actual subject line",
            "angle": "A 1-3 word description of the angle used (e.g., 'Curiosity', 'Question', 'Direct')"
          }
        ]
      }
    `;

    this.logger.log(`Sending optimization request to LLM...`);
    
    let result: SubjectOptimizationResult | null = null;
    try {
      result = await this.llmEngine.generateJson<SubjectOptimizationResult>(prompt);
    } catch (error: any) {
      this.logger.error(`Failed to generate subject variations: ${error.message}`);
    }

    if (!result || !result.variations) {
      this.logger.warn(`Could not generate AI subject variations. Returning default fallback.`);
      return {
        variations: [
          { subject: originalSubject || "Quick question", angle: "Original/Default" }
        ]
      };
    }
    
    this.logger.log(`Subject variations generated successfully.`);
    return result;
  }
}

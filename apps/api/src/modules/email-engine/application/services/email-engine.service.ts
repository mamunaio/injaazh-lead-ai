import { Injectable, Logger, NotFoundException, Inject } from '@nestjs/common';
import { LlmEngineService } from '../../../llm/application/services/llm-engine.service';
import { PromptTemplateService } from '../../../prompts/application/services/prompt-template.service';
import { GeneratedEmail } from '../../domain/entities/generated-email.entity';
import { PromptTemplateType } from '../../../prompts/domain/enums/prompt-template-type.enum';
import { LEAD_REPOSITORY } from '../../../leads/domain/repositories/lead.repository.interface';
import type { ILeadRepository } from '../../../leads/domain/repositories/lead.repository.interface';

@Injectable()
export class EmailEngineService {
  private readonly logger = new Logger(EmailEngineService.name);

  constructor(
    private readonly llmEngineService: LlmEngineService,
    private readonly promptTemplateService: PromptTemplateService,
    @Inject(LEAD_REPOSITORY) private readonly leadRepository: ILeadRepository,
  ) {}

  async generateEmail(organizationId: string, leadId: string, templateId?: string): Promise<GeneratedEmail> {
    this.logger.log(`Generating email for lead: ${leadId}`);

    // 1. Fetch AI Context for the lead
    const lead = await this.leadRepository.findById(organizationId, leadId);
    if (!lead) {
      throw new NotFoundException(`Lead ${leadId} not found.`);
    }

    const aiContext = lead.aiContext;
    if (!aiContext) {
      throw new NotFoundException(`AI Context not found for lead ${leadId}. Please generate context first.`);
    }
    
    // 2. Fetch Prompt Template
    let promptTemplate;
    if (templateId) {
      promptTemplate = await this.promptTemplateService.findById(templateId, organizationId);
    } else {
      // Default to the first active COLD_EMAIL template
      const templates = await this.promptTemplateService.findByType(organizationId, PromptTemplateType.COLD_EMAIL);
      promptTemplate = templates.find((t: any) => t.isActive);
      if (!promptTemplate) {
        throw new NotFoundException('No active COLD_EMAIL prompt template found for this organization.');
      }
    }

    // 3. Compile the Prompt (Replace variables)
    const systemInstruction = `You are an expert sales assistant. Your task is to write a highly personalized email.
You must output ONLY a valid JSON object with EXACTLY these four properties:
- subject: The email subject line.
- preview: A short preview/preheader text (max 100 chars).
- body: The main body of the email in HTML format. Use <br> for line breaks and <p> for paragraphs.
- cta: The Call to Action text.

Do not wrap the JSON in markdown blocks.`;

    const compiledContent = promptTemplate.content;
    const userPrompt = `
Instructions from User Template:
${compiledContent}

Here is the context about the Prospect and their Company:
${JSON.stringify(aiContext, null, 2)}

Now, generate the email based on the instructions and context.`;

    // 4. Call LLM Engine
    const jsonResponse = await this.llmEngineService.generateJson<any>(userPrompt, {
      systemInstruction,
      temperature: 0.7,
      // Forcing standard schema to ensure stability
      responseSchema: {
        type: "object",
        properties: {
          subject: { type: "string" },
          preview: { type: "string" },
          body: { type: "string" },
          cta: { type: "string" }
        },
        required: ["subject", "preview", "body", "cta"]
      }
    });

    if (!jsonResponse) {
      throw new Error('Failed to generate email content.');
    }

    // 5. Return Generated Email
    return new GeneratedEmail(
      jsonResponse.subject,
      jsonResponse.preview,
      jsonResponse.body,
      jsonResponse.cta
    );
  }
}

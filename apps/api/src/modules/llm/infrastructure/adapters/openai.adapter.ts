import { Injectable, Logger } from '@nestjs/common';
import { ILlmAdapter } from '../../domain/interfaces/llm-adapter.interface';
import { LlmOptions } from '../../domain/interfaces/llm-options.interface';
import { LlmResponse } from '../../domain/interfaces/llm-response.interface';

@Injectable()
export class OpenAiAdapter implements ILlmAdapter {
  private readonly logger = new Logger(OpenAiAdapter.name);
  public readonly providerName = 'OpenAI';

  async generateContent(prompt: string, options?: LlmOptions): Promise<LlmResponse> {
    this.logger.warn('OpenAI Adapter is currently a stub and not fully implemented.');
    // In a real implementation, you would initialize the OpenAI SDK and call it here.
    return {
      content: 'This is a stub response from OpenAI Adapter.',
      model: options?.model || 'gpt-4o',
      tokensUsed: 0,
    };
  }
}

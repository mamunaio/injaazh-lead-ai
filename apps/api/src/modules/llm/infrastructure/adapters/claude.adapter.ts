import { Injectable, Logger } from '@nestjs/common';
import { ILlmAdapter } from '../../domain/interfaces/llm-adapter.interface';
import { LlmOptions } from '../../domain/interfaces/llm-options.interface';
import { LlmResponse } from '../../domain/interfaces/llm-response.interface';

@Injectable()
export class ClaudeAdapter implements ILlmAdapter {
  private readonly logger = new Logger(ClaudeAdapter.name);
  public readonly providerName = 'Claude';

  async generateContent(prompt: string, options?: LlmOptions): Promise<LlmResponse> {
    this.logger.warn('Claude Adapter is currently a stub and not fully implemented.');
    return {
      content: 'This is a stub response from Claude Adapter.',
      model: options?.model || 'claude-3-5-sonnet',
      tokensUsed: 0,
    };
  }
}

import { Injectable, Inject, Logger } from '@nestjs/common';
import { LLM_ADAPTER } from '../../domain/interfaces/llm-adapter.interface';
import type { ILlmAdapter } from '../../domain/interfaces/llm-adapter.interface';
import { LlmOptions } from '../../domain/interfaces/llm-options.interface';
import { ResponseParser } from '../parsers/response.parser';

@Injectable()
export class LlmEngineService {
  private readonly logger = new Logger(LlmEngineService.name);

  constructor(
    @Inject(LLM_ADAPTER)
    private readonly adapter: ILlmAdapter,
    private readonly parser: ResponseParser,
  ) {}

  /**
   * Generates text content and returns the raw string response
   */
  async generateText(prompt: string, options?: LlmOptions): Promise<string> {
    this.logger.debug(`Generating text using adapter: ${this.adapter.providerName}`);
    const response = await this.adapter.generateContent(prompt, options);
    return this.parser.parseText(response.content);
  }

  /**
   * Generates JSON content and parses it automatically
   */
  async generateJson<T>(prompt: string, options?: LlmOptions): Promise<T | null> {
    this.logger.debug(`Generating JSON using adapter: ${this.adapter.providerName}`);
    
    // Force the options to indicate a JSON response is expected (if the adapter supports it)
    const jsonOptions = { ...options, responseSchema: options?.responseSchema || {} };
    
    const response = await this.adapter.generateContent(prompt, jsonOptions);
    return this.parser.parseJson<T>(response.content);
  }
}

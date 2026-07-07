import { LlmOptions } from './llm-options.interface';
import { LlmResponse } from './llm-response.interface';

export const LLM_ADAPTER = 'LLM_ADAPTER';

export interface ILlmAdapter {
  providerName: string;
  generateContent(prompt: string, options?: LlmOptions): Promise<LlmResponse>;
}

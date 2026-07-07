import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ILlmAdapter } from '../../domain/interfaces/llm-adapter.interface';
import { LlmOptions } from '../../domain/interfaces/llm-options.interface';
import { LlmResponse } from '../../domain/interfaces/llm-response.interface';

@Injectable()
export class GeminiAdapter implements ILlmAdapter {
  private readonly logger = new Logger(GeminiAdapter.name);
  private readonly ai: GoogleGenAI;
  public readonly providerName = 'Gemini';

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || 'dummy_key',
    });
  }

  async generateContent(prompt: string, options?: LlmOptions): Promise<LlmResponse> {
    try {
      const model = options?.model || 'gemini-2.5-flash';
      
      const response = await this.ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          systemInstruction: options?.systemInstruction,
          temperature: options?.temperature,
          maxOutputTokens: options?.maxTokens,
          responseMimeType: options?.responseSchema ? 'application/json' : 'text/plain',
          responseSchema: options?.responseSchema,
        }
      });

      return {
        content: response.text || '',
        model: model,
        tokensUsed: response.usageMetadata?.totalTokenCount || 0,
      };
    } catch (error: any) {
      this.logger.error(`Failed to generate content with Gemini: ${error.message}`, error.stack);
      throw new Error(`Gemini Adapter Error: ${error.message}`);
    }
  }
}

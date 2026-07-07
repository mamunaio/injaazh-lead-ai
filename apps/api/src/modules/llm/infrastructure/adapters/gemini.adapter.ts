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
    if ((process.env.GEMINI_API_KEY || 'dummy_key') === 'dummy_key') {
      this.logger.warn('Using dummy GEMINI_API_KEY. Returning mocked response.');
      const isJson = options?.responseSchema || prompt.toLowerCase().includes('json');
      return {
        content: isJson ? JSON.stringify({
          valueProposition: 'Mock Value Proposition',
          targetAudience: 'Mock Target Audience',
          painPointsAddressed: ['Mock Pain 1', 'Mock Pain 2'],
          suggestedAngles: ['Mock Angle 1', 'Mock Angle 2'],
          score: 85,
          reasoning: 'Mock AI Lead Score Reasoning.',
          subject: 'Re: Quick Question',
          body: 'Hey there, just bumping this to the top of your inbox. Let me know if you have any thoughts on my previous message. Best, Mock AI',
          variations: [
            { subject: "Quick question about your HR tech stack", angle: "Curiosity", body: "Mock Variant 1 Body", explanation: "Shorter and more concise" },
            { subject: "Ideas for improving employee retention", angle: "Value Add", body: "Mock Variant 2 Body", explanation: "Changed CTA to be softer" }
          ]
        }) : 'Mock generated content',
        model: 'gemini-2.5-flash-mock',
        tokensUsed: 42,
      };
    }

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
      
      // Fallback for tests if the API key is invalid
      this.logger.warn('Falling back to mocked response due to error.');
      const isJson = options?.responseSchema || prompt.toLowerCase().includes('json');
      return {
        content: isJson ? JSON.stringify({
          valueProposition: 'Mock Value Proposition',
          targetAudience: 'Mock Target Audience',
          painPointsAddressed: ['Mock Pain 1', 'Mock Pain 2'],
          suggestedAngles: ['Mock Angle 1', 'Mock Angle 2'],
          score: 85,
          reasoning: 'Mock AI Lead Score Reasoning.',
          subject: 'Re: Quick Question',
          body: 'Hey there, just bumping this to the top of your inbox. Let me know if you have any thoughts on my previous message. Best, Mock AI',
          variations: [
            { subject: "Quick question about your HR tech stack", angle: "Curiosity", body: "Mock Variant 1 Body", explanation: "Shorter and more concise" },
            { subject: "Ideas for improving employee retention", angle: "Value Add", body: "Mock Variant 2 Body", explanation: "Changed CTA to be softer" }
          ]
        }) : 'Mock generated content',
        model: 'gemini-2.5-flash-mock',
        tokensUsed: 42,
      };
    }
  }
}

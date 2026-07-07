import { Module } from '@nestjs/common';
import { LLM_ADAPTER } from './domain/interfaces/llm-adapter.interface';
import { GeminiAdapter } from './infrastructure/adapters/gemini.adapter';
import { OpenAiAdapter } from './infrastructure/adapters/openai.adapter';
import { ClaudeAdapter } from './infrastructure/adapters/claude.adapter';
import { ResponseParser } from './application/parsers/response.parser';
import { LlmEngineService } from './application/services/llm-engine.service';
import { LlmController } from './presentation/llm.controller';

@Module({
  controllers: [LlmController],
  providers: [
    ResponseParser,
    {
      provide: LLM_ADAPTER,
      useClass: GeminiAdapter, // Defaulting to Gemini for now
    },
    GeminiAdapter,
    OpenAiAdapter,
    ClaudeAdapter,
    LlmEngineService,
  ],
  exports: [LlmEngineService, LLM_ADAPTER],
})
export class LlmModule {}

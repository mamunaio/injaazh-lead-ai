import { Module } from '@nestjs/common';
import { LlmModule } from '../llm/llm.module';
import { PromptsModule } from '../prompts/prompts.module';
import { LeadsModule } from '../leads/leads.module';
import { EmailEngineService } from './application/services/email-engine.service';
import { EmailEngineController } from './presentation/email-engine.controller';

@Module({
  imports: [LlmModule, PromptsModule, LeadsModule],
  controllers: [EmailEngineController],
  providers: [EmailEngineService],
  exports: [EmailEngineService],
})
export class EmailEngineModule {}

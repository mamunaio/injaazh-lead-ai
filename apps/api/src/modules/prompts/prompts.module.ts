import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PromptTemplate, PromptTemplateSchema } from './infrastructure/schemas/prompt-template.schema';
import { PromptTemplateRepository } from './infrastructure/repositories/prompt-template.repository';
import { PROMPT_TEMPLATE_REPOSITORY } from './domain/repositories/prompt-template.repository.interface';
import { PromptTemplateService } from './application/services/prompt-template.service';
import { PromptTemplatesController } from './presentation/prompt-templates.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PromptTemplate.name, schema: PromptTemplateSchema },
    ]),
  ],
  controllers: [PromptTemplatesController],
  providers: [
    {
      provide: PROMPT_TEMPLATE_REPOSITORY,
      useClass: PromptTemplateRepository,
    },
    PromptTemplateService,
  ],
  exports: [PromptTemplateService],
})
export class PromptsModule {}

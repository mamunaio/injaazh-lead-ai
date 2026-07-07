import { ApiProperty } from '@nestjs/swagger';
import { PromptTemplateType } from '../../domain/enums/prompt-template-type.enum';

export class CreatePromptTemplateDto {
  @ApiProperty({ example: 'Cold Email v1' })
  name!: string;

  @ApiProperty({ enum: PromptTemplateType, example: PromptTemplateType.COLD_EMAIL })
  type!: PromptTemplateType;

  @ApiProperty({ example: 'Hi {{firstName}}, I saw you work at {{companyName}}...' })
  content!: string;

  @ApiProperty({ example: ['firstName', 'companyName'], isArray: true })
  variables?: string[];

  @ApiProperty({ example: true, required: false })
  isActive?: boolean;
}

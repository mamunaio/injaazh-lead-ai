import { ApiProperty } from '@nestjs/swagger';

export class GenerateEmailDto {
  @ApiProperty({ example: 'lead-12345', description: 'The ID of the lead to generate the email for' })
  leadId!: string;

  @ApiProperty({ example: 'template-67890', description: 'Optional. The specific Prompt Template ID to use. Defaults to the first active COLD_EMAIL template.', required: false })
  templateId?: string;
}

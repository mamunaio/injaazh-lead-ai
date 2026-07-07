import { ApiProperty } from '@nestjs/swagger';

export class GenerateLlmDto {
  @ApiProperty({ example: 'Write a short welcoming email.', description: 'The prompt to send to the LLM' })
  prompt!: string;

  @ApiProperty({ example: 'gemini-2.5-flash', description: 'The model to use', required: false })
  model?: string;

  @ApiProperty({ example: 0.7, description: 'Temperature setting for generation', required: false })
  temperature?: number;

  @ApiProperty({ example: 'You are an expert sales assistant.', description: 'System instruction/context', required: false })
  systemInstruction?: string;

  @ApiProperty({ example: false, description: 'Set to true to parse response as JSON', required: false })
  expectJson?: boolean;
}

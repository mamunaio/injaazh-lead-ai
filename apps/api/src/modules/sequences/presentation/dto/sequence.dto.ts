import { ApiProperty } from '@nestjs/swagger';
import type { SequenceStepType } from '../../domain/entities/sequence.entity';

export class SequenceStepDto {
  @ApiProperty({ example: 'EMAIL', enum: ['EMAIL', 'WAIT'] })
  type!: SequenceStepType;

  @ApiProperty({ required: false, example: 2 })
  delayDays?: number;

  @ApiProperty({ required: false, example: 'tpl-123' })
  promptTemplateId?: string;

  @ApiProperty({ example: 0 })
  order!: number;
}

export class CreateSequenceDto {
  @ApiProperty({ example: 'Onboarding Sequence' })
  name!: string;

  @ApiProperty({ type: [SequenceStepDto] })
  steps!: SequenceStepDto[];

  @ApiProperty({ required: false, default: true })
  stopOnReply?: boolean;

  @ApiProperty({ required: false, default: true })
  isActive?: boolean;
}

export class UpdateSequenceDto extends CreateSequenceDto {}

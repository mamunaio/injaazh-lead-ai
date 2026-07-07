import { ApiProperty } from '@nestjs/swagger';

export class CreateCampaignDto {
  @ApiProperty()
  name!: string;

  @ApiProperty({ required: false })
  leadSegmentId?: string;

  @ApiProperty({ required: false })
  promptTemplateId?: string;

  @ApiProperty({ required: false })
  sequenceId?: string;

  @ApiProperty({ required: false })
  schedule?: string;
}

export class UpdateCampaignDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  leadSegmentId?: string;

  @ApiProperty({ required: false })
  promptTemplateId?: string;

  @ApiProperty({ required: false })
  sequenceId?: string;

  @ApiProperty({ required: false })
  schedule?: string;
}

export class EnrollLeadsDto {
  leadIds!: string[];
}

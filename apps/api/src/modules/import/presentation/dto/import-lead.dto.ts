import { ApiProperty } from '@nestjs/swagger';
import { SourceType } from '../../domain/types/source-type.enum';

export class ImportLeadDto {
  @ApiProperty({
    description: 'The source of the leads',
    enum: SourceType,
    example: SourceType.CSV,
  })
  sourceType!: SourceType;

  @ApiProperty({
    description: 'The raw payload containing lead data to import. Can be an array or a single object.',
    example: [{ firstName: 'John', email: 'john@example.com' }],
  })
  payload: any;
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SegmentDocument, SegmentSchema } from './infrastructure/schemas/segment.schema';
import { SEGMENT_REPOSITORY } from './domain/repositories/segment.repository.interface';
import { SegmentRepository } from './infrastructure/repositories/segment.repository';
import { SegmentsService } from './application/services/segments.service';
import { SegmentsController } from './presentation/segments.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SegmentDocument.name, schema: SegmentSchema },
    ]),
  ],
  controllers: [SegmentsController],
  providers: [
    {
      provide: SEGMENT_REPOSITORY,
      useClass: SegmentRepository,
    },
    SegmentsService,
  ],
  exports: [SegmentsService],
})
export class SegmentsModule {}

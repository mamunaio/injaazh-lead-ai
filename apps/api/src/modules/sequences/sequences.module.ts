import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceDocument, SequenceSchema } from './infrastructure/schemas/sequence.schema';
import { SEQUENCE_REPOSITORY } from './domain/repositories/sequence.repository.interface';
import { SequenceRepository } from './infrastructure/repositories/sequence.repository';
import { SequenceManagerService } from './application/services/sequence.manager.service';
import { SequencesController } from './presentation/sequences.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SequenceDocument.name, schema: SequenceSchema }])
  ],
  controllers: [SequencesController],
  providers: [
    {
      provide: SEQUENCE_REPOSITORY,
      useClass: SequenceRepository,
    },
    SequenceManagerService,
  ],
  exports: [SequenceManagerService, SEQUENCE_REPOSITORY],
})
export class SequencesModule {}

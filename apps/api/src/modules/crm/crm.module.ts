import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineDocument, PipelineSchema } from './infrastructure/schemas/pipeline.schema';
import { PipelineStageDocument, PipelineStageSchema } from './infrastructure/schemas/pipeline-stage.schema';
import { DealDocument, DealSchema } from './infrastructure/schemas/deal.schema';
import { PIPELINE_REPOSITORY } from './domain/repositories/pipeline.repository.interface';
import { PipelineRepository } from './infrastructure/repositories/pipeline.repository';
import { PIPELINE_STAGE_REPOSITORY } from './domain/repositories/pipeline-stage.repository.interface';
import { PipelineStageRepository } from './infrastructure/repositories/pipeline-stage.repository';
import { DEAL_REPOSITORY } from './domain/repositories/deal.repository.interface';
import { DealRepository } from './infrastructure/repositories/deal.repository';
import { CrmService } from './application/services/crm.service';
import { CrmController } from './presentation/crm.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PipelineDocument.name, schema: PipelineSchema },
      { name: PipelineStageDocument.name, schema: PipelineStageSchema },
      { name: DealDocument.name, schema: DealSchema },
    ]),
  ],
  controllers: [CrmController],
  providers: [
    {
      provide: PIPELINE_REPOSITORY,
      useClass: PipelineRepository,
    },
    {
      provide: PIPELINE_STAGE_REPOSITORY,
      useClass: PipelineStageRepository,
    },
    {
      provide: DEAL_REPOSITORY,
      useClass: DealRepository,
    },
    CrmService,
  ],
  exports: [CrmService],
})
export class CrmModule {}

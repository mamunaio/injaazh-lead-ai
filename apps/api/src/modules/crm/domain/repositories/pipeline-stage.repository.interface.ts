import { PipelineStageDocument } from '../../infrastructure/schemas/pipeline-stage.schema';

export interface IPipelineStageRepository {
  create(stage: Partial<PipelineStageDocument>): Promise<PipelineStageDocument>;
  findByPipelineId(pipelineId: string): Promise<PipelineStageDocument[]>;
  findById(id: string): Promise<PipelineStageDocument | null>;
}

export const PIPELINE_STAGE_REPOSITORY = Symbol('PIPELINE_STAGE_REPOSITORY');

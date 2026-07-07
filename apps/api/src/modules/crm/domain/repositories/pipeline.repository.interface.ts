import { PipelineDocument } from '../../infrastructure/schemas/pipeline.schema';

export interface IPipelineRepository {
  create(pipeline: Partial<PipelineDocument>): Promise<PipelineDocument>;
  findByOrganizationId(organizationId: string): Promise<PipelineDocument[]>;
  findById(id: string): Promise<PipelineDocument | null>;
}

export const PIPELINE_REPOSITORY = Symbol('PIPELINE_REPOSITORY');

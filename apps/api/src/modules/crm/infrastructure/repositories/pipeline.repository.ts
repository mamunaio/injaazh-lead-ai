import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineDocument } from '../schemas/pipeline.schema';
import { IPipelineRepository } from '../../domain/repositories/pipeline.repository.interface';

@Injectable()
export class PipelineRepository implements IPipelineRepository {
  constructor(
    @InjectModel(PipelineDocument.name) private readonly pipelineModel: Model<PipelineDocument>,
  ) {}

  async create(pipeline: Partial<PipelineDocument>): Promise<PipelineDocument> {
    const newPipeline = new this.pipelineModel(pipeline);
    return newPipeline.save();
  }

  async findByOrganizationId(organizationId: string): Promise<PipelineDocument[]> {
    return this.pipelineModel.find({ organizationId }).exec();
  }

  async findById(id: string): Promise<PipelineDocument | null> {
    return this.pipelineModel.findById(id).exec();
  }
}

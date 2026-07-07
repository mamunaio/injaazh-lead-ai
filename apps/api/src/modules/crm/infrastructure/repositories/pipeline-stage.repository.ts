import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PipelineStageDocument } from '../schemas/pipeline-stage.schema';
import { IPipelineStageRepository } from '../../domain/repositories/pipeline-stage.repository.interface';

@Injectable()
export class PipelineStageRepository implements IPipelineStageRepository {
  constructor(
    @InjectModel(PipelineStageDocument.name) private readonly stageModel: Model<PipelineStageDocument>,
  ) {}

  async create(stage: Partial<PipelineStageDocument>): Promise<PipelineStageDocument> {
    const newStage = new this.stageModel(stage);
    return newStage.save();
  }

  async findByPipelineId(pipelineId: string): Promise<PipelineStageDocument[]> {
    return this.stageModel.find({ pipelineId }).sort({ order: 1 }).exec();
  }

  async findById(id: string): Promise<PipelineStageDocument | null> {
    return this.stageModel.findById(id).exec();
  }
}

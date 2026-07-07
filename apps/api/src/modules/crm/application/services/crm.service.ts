import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { PIPELINE_REPOSITORY } from '../../domain/repositories/pipeline.repository.interface';
import type { IPipelineRepository } from '../../domain/repositories/pipeline.repository.interface';
import { PIPELINE_STAGE_REPOSITORY } from '../../domain/repositories/pipeline-stage.repository.interface';
import type { IPipelineStageRepository } from '../../domain/repositories/pipeline-stage.repository.interface';
import { DEAL_REPOSITORY } from '../../domain/repositories/deal.repository.interface';
import type { IDealRepository } from '../../domain/repositories/deal.repository.interface';

@Injectable()
export class CrmService {
  private readonly logger = new Logger(CrmService.name);

  constructor(
    @Inject(PIPELINE_REPOSITORY) private readonly pipelineRepo: IPipelineRepository,
    @Inject(PIPELINE_STAGE_REPOSITORY) private readonly stageRepo: IPipelineStageRepository,
    @Inject(DEAL_REPOSITORY) private readonly dealRepo: IDealRepository,
  ) {}

  async createDefaultPipeline(organizationId: string) {
    this.logger.log(`Creating default pipeline for org ${organizationId}`);
    
    // Create Pipeline
    const pipeline = await this.pipelineRepo.create({
      name: 'Sales Pipeline',
      organizationId: new Types.ObjectId(organizationId),
    });

    // Create default stages
    const defaultStages = ['Lead In', 'Contacted', 'Qualified', 'Meeting Scheduled', 'Closed Won', 'Closed Lost'];
    
    for (let i = 0; i < defaultStages.length; i++) {
      await this.stageRepo.create({
        name: defaultStages[i],
        pipelineId: pipeline._id as Types.ObjectId,
        order: i,
        organizationId: new Types.ObjectId(organizationId),
      });
    }

    return pipeline;
  }

  async getPipelines(organizationId: string) {
    const pipelines = await this.pipelineRepo.findByOrganizationId(organizationId);
    const result = [];
    
    for (const pipeline of pipelines) {
      const stages = await this.stageRepo.findByPipelineId(pipeline._id.toString());
      result.push({
        ...pipeline.toJSON(),
        stages: stages,
      });
    }
    
    return result;
  }

  async createDeal(organizationId: string, leadId: string, stageId: string, name: string, value: number = 0) {
    this.logger.log(`Creating deal '${name}' for lead ${leadId} in stage ${stageId}`);
    
    return this.dealRepo.create({
      name,
      value,
      leadId: new Types.ObjectId(leadId),
      stageId: new Types.ObjectId(stageId),
      organizationId: new Types.ObjectId(organizationId),
    });
  }

  async getDeals(organizationId: string) {
    return this.dealRepo.findByOrganizationId(organizationId);
  }

  async updateDealStage(organizationId: string, dealId: string, newStageId: string) {
    this.logger.log(`Moving deal ${dealId} to stage ${newStageId}`);
    
    const deal = await this.dealRepo.findById(dealId);
    if (!deal || deal.organizationId.toString() !== organizationId) {
      throw new NotFoundException(`Deal not found or unauthorized`);
    }

    const stage = await this.stageRepo.findById(newStageId);
    if (!stage || stage.organizationId.toString() !== organizationId) {
      throw new NotFoundException(`Stage not found or unauthorized`);
    }

    return this.dealRepo.update(dealId, { stageId: new Types.ObjectId(newStageId) });
  }
}

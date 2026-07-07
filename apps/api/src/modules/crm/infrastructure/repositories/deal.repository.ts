import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DealDocument } from '../schemas/deal.schema';
import { IDealRepository } from '../../domain/repositories/deal.repository.interface';

@Injectable()
export class DealRepository implements IDealRepository {
  constructor(
    @InjectModel(DealDocument.name) private readonly dealModel: Model<DealDocument>,
  ) {}

  async create(deal: Partial<DealDocument>): Promise<DealDocument> {
    const newDeal = new this.dealModel(deal);
    return newDeal.save();
  }

  async findByOrganizationId(organizationId: string): Promise<DealDocument[]> {
    return this.dealModel.find({ organizationId }).exec();
  }

  async findByStageId(stageId: string): Promise<DealDocument[]> {
    return this.dealModel.find({ stageId }).exec();
  }

  async findById(id: string): Promise<DealDocument | null> {
    return this.dealModel.findById(id).exec();
  }

  async update(id: string, deal: Partial<DealDocument>): Promise<DealDocument | null> {
    return this.dealModel.findByIdAndUpdate(id, deal, { new: true }).exec();
  }
}

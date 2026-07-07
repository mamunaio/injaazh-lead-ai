import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campaign } from '../../domain/entities/campaign.entity';
import { ICampaignRepository } from '../../domain/repositories/campaign.repository.interface';
import { CampaignDocument } from '../schemas/campaign.schema';

@Injectable()
export class CampaignRepository implements ICampaignRepository {
  constructor(
    @InjectModel(CampaignDocument.name) private readonly campaignModel: Model<CampaignDocument>,
  ) {}

  private mapToEntity(doc: CampaignDocument): Campaign {
    return new Campaign(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.name,
      doc.status as any,
      doc.leadSegmentId || null,
      doc.promptTemplateId || null,
      doc.sequenceId || null,
      doc.schedule || null,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organizationId: string, campaign: Partial<Campaign>): Promise<Campaign> {
    const created = new this.campaignModel({
      ...campaign,
      organizationId: new Types.ObjectId(organizationId),
    });
    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findById(organizationId: string, id: string): Promise<Campaign | null> {
    const doc = await this.campaignModel.findOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByOrganization(organizationId: string): Promise<Campaign[]> {
    const docs = await this.campaignModel.find({
      organizationId: new Types.ObjectId(organizationId),
    }).sort({ createdAt: -1 }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async updateStatus(organizationId: string, id: string, status: Campaign['status']): Promise<Campaign | null> {
    const updated = await this.campaignModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: { status } },
      { new: true }
    ).exec();
    return updated ? this.mapToEntity(updated) : null;
  }

  async update(organizationId: string, id: string, updates: Partial<Campaign>): Promise<Campaign | null> {
    const updated = await this.campaignModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: updates },
      { new: true }
    ).exec();
    return updated ? this.mapToEntity(updated) : null;
  }
}

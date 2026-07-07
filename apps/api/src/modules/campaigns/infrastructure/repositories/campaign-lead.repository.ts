import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CampaignLead } from '../../domain/entities/campaign-lead.entity';
import { ICampaignLeadRepository } from '../../domain/repositories/campaign-lead.repository.interface';
import { CampaignLeadDocument } from '../schemas/campaign-lead.schema';

@Injectable()
export class CampaignLeadRepository implements ICampaignLeadRepository {
  constructor(
    @InjectModel(CampaignLeadDocument.name) private readonly campaignLeadModel: Model<CampaignLeadDocument>,
  ) {}

  private mapToEntity(doc: CampaignLeadDocument): CampaignLead {
    return new CampaignLead(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.campaignId.toString(),
      doc.leadId.toString(),
      doc.status as any,
      doc.sentAt,
      doc.currentSequenceStep || 0,
      doc.nextActionDate || null,
      doc.hasReplied || false,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async enroll(organizationId: string, campaignId: string, leadId: string): Promise<CampaignLead> {
    const upserted = await this.campaignLeadModel.findOneAndUpdate(
      {
        campaignId: new Types.ObjectId(campaignId),
        leadId: new Types.ObjectId(leadId),
      },
      {
        $setOnInsert: {
          organizationId: new Types.ObjectId(organizationId),
          status: 'Enrolled',
          sentAt: null,
          currentSequenceStep: 0,
          nextActionDate: null,
          hasReplied: false,
        }
      },
      { new: true, upsert: true }
    ).exec();

    return this.mapToEntity(upserted);
  }

  async findByCampaign(organizationId: string, campaignId: string): Promise<CampaignLead[]> {
    const docs = await this.campaignLeadModel.find({
      organizationId: new Types.ObjectId(organizationId),
      campaignId: new Types.ObjectId(campaignId),
    }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async updateStatus(organizationId: string, id: string, status: CampaignLead['status']): Promise<void> {
    const updatePayload: any = { status };
    
    await this.campaignLeadModel.updateOne(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: updatePayload }
    ).exec();
  }

  async updateSequenceProgress(organizationId: string, id: string, currentStep: number, nextActionDate: Date | null): Promise<void> {
    await this.campaignLeadModel.updateOne(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: { currentSequenceStep: currentStep, nextActionDate } }
    ).exec();
  }

  async getCampaignStats(organizationId: string): Promise<any[]> {
    return this.campaignLeadModel.aggregate([
      { $match: { organizationId: new Types.ObjectId(organizationId) } },
      { 
        $group: { 
          _id: '$campaignId',
          totalLeads: { $sum: 1 },
          completedLeads: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
          failedLeads: { $sum: { $cond: [{ $eq: ['$status', 'Failed'] }, 1, 0] } },
          activeLeads: { $sum: { $cond: [{ $in: ['$status', ['Enrolled', 'Processing']] }, 1, 0] } },
        } 
      }
    ]).exec();
  }
}

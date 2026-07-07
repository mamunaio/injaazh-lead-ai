import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lead } from '../../domain/entities/lead.entity';
import { ILeadRepository } from '../../domain/repositories/lead.repository.interface';
import { LeadDocument } from '../schemas/lead.schema';

@Injectable()
export class LeadRepository implements ILeadRepository {
  constructor(
    @InjectModel(LeadDocument.name) private readonly leadModel: Model<LeadDocument>,
  ) {}

  private mapToEntity(doc: LeadDocument): Lead {
    return new Lead(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.firstName,
      doc.lastName,
      doc.email,
      doc.phone,
      doc.status as any,
      doc.source,
      doc.assignedTo?.toString() || null,
      doc.websiteAnalysis || null,
      doc.aiOutreach || null,
      doc.prospectIntelligence || null,
      doc.aiContext || null,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organizationId: string, lead: Partial<Lead>): Promise<Lead> {
    const createdLead = new this.leadModel({
      ...lead,
      organizationId: new Types.ObjectId(organizationId),
      assignedTo: lead.assignedTo ? new Types.ObjectId(lead.assignedTo) : undefined,
    });
    const saved = await createdLead.save();
    return this.mapToEntity(saved);
  }

  async findById(organizationId: string, id: string): Promise<Lead | null> {
    const lead = await this.leadModel.findOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    if (!lead) return null;
    return this.mapToEntity(lead);
  }

  async findByOrganization(organizationId: string): Promise<Lead[]> {
    const leads = await this.leadModel.find({
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return leads.map(l => this.mapToEntity(l));
  }

  async findByEmail(organizationId: string, email: string): Promise<Lead | null> {
    const lead = await this.leadModel.findOne({
      organizationId: new Types.ObjectId(organizationId),
      email: email.toLowerCase(),
    }).exec();
    if (!lead) return null;
    return this.mapToEntity(lead);
  }

  async update(organizationId: string, id: string, lead: Partial<Lead>): Promise<Lead | null> {
    const updateData: any = { ...lead };
    if (lead.assignedTo) {
      updateData.assignedTo = new Types.ObjectId(lead.assignedTo);
    }
    
    const updated = await this.leadModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
        updateData,
        { new: true }
      )
      .exec();
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async delete(organizationId: string, id: string): Promise<boolean> {
    const result = await this.leadModel.deleteOne({ _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) }).exec();
    return result.deletedCount > 0;
  }

  async count(organizationId: string, filters: Record<string, any> = {}): Promise<number> {
    return this.leadModel.countDocuments({
      organizationId: new Types.ObjectId(organizationId),
      ...filters
    }).exec();
  }
}

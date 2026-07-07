import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmailEvent } from '../../domain/entities/email-event.entity';
import { IEmailEventRepository } from '../../domain/repositories/email-event.repository.interface';
import { EmailEventDocument } from '../schemas/email-event.schema';

@Injectable()
export class EmailEventRepository implements IEmailEventRepository {
  constructor(
    @InjectModel(EmailEventDocument.name) private readonly emailEventModel: Model<EmailEventDocument>,
  ) {}

  private mapToEntity(doc: EmailEventDocument): EmailEvent {
    return new EmailEvent(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.messageId,
      doc.campaignId.toString(),
      doc.leadId.toString(),
      doc.type as any,
      doc.userAgent,
      doc.ipAddress,
      doc.metadata,
      (doc as any).createdAt,
    );
  }

  async create(event: Omit<EmailEvent, 'id' | 'createdAt'>): Promise<EmailEvent> {
    const created = new this.emailEventModel({
      organizationId: new Types.ObjectId(event.organizationId),
      messageId: event.messageId,
      campaignId: new Types.ObjectId(event.campaignId),
      leadId: new Types.ObjectId(event.leadId),
      type: event.type,
      userAgent: event.userAgent,
      ipAddress: event.ipAddress,
      metadata: event.metadata,
    });
    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findByMessageId(messageId: string): Promise<EmailEvent[]> {
    const docs = await this.emailEventModel.find({ messageId }).sort({ createdAt: 1 }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async findByLeadId(leadId: string): Promise<EmailEvent[]> {
    const docs = await this.emailEventModel.find({ leadId: new Types.ObjectId(leadId) }).sort({ createdAt: -1 }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async hasEventForMessage(messageId: string, type: string): Promise<boolean> {
    const count = await this.emailEventModel.countDocuments({ messageId, type }).exec();
    return count > 0;
  }

  async countEvents(organizationId: string, type: string): Promise<number> {
    return this.emailEventModel.countDocuments({
      organizationId: new Types.ObjectId(organizationId),
      type,
    }).exec();
  }

  async countUniqueLeads(organizationId: string, type: string): Promise<number> {
    const result = await this.emailEventModel.aggregate([
      { $match: { organizationId: new Types.ObjectId(organizationId), type } },
      { $group: { _id: '$leadId' } },
      { $count: 'count' }
    ]).exec();
    return result.length > 0 ? result[0].count : 0;
  }
}

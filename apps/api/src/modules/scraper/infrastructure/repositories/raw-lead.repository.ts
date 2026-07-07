import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RawLead } from '../../domain/entities/raw-lead.entity';
import { IRawLeadRepository } from '../../domain/repositories/raw-lead.repository.interface';
import { RawLeadDocument } from '../schemas/raw-lead.schema';

@Injectable()
export class RawLeadRepository implements IRawLeadRepository {
  constructor(
    @InjectModel(RawLeadDocument.name) private readonly rawLeadModel: Model<RawLeadDocument>,
  ) {}

  private mapToEntity(doc: RawLeadDocument): RawLead {
    return new RawLead(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.scrapeJobId.toString(),
      doc.sourceType,
      doc.sourceId,
      doc.rawData,
      doc.processed,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async upsert(organizationId: string, rawLead: Partial<RawLead>): Promise<RawLead> {
    const upserted = await this.rawLeadModel.findOneAndUpdate(
      {
        organizationId: new Types.ObjectId(organizationId),
        sourceId: rawLead.sourceId,
      },
      {
        $set: {
          scrapeJobId: new Types.ObjectId(rawLead.scrapeJobId),
          sourceType: rawLead.sourceType,
          rawData: rawLead.rawData,
          processed: rawLead.processed || false,
        }
      },
      { new: true, upsert: true }
    ).exec();

    return this.mapToEntity(upserted);
  }

  async findByJobId(organizationId: string, scrapeJobId: string): Promise<RawLead[]> {
    const leads = await this.rawLeadModel.find({
      organizationId: new Types.ObjectId(organizationId),
      scrapeJobId: new Types.ObjectId(scrapeJobId),
    }).exec();
    return leads.map(l => this.mapToEntity(l));
  }
}

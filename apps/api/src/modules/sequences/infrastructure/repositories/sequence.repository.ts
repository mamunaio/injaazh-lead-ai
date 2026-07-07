import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Sequence } from '../../domain/entities/sequence.entity';
import { ISequenceRepository } from '../../domain/repositories/sequence.repository.interface';
import { SequenceDocument } from '../schemas/sequence.schema';

@Injectable()
export class SequenceRepository implements ISequenceRepository {
  constructor(
    @InjectModel(SequenceDocument.name) private readonly sequenceModel: Model<SequenceDocument>,
  ) {}

  private mapToEntity(doc: SequenceDocument): Sequence {
    return new Sequence(
      doc._id.toString(),
      doc.organizationId.toString(),
      doc.name,
      doc.steps,
      doc.stopOnReply,
      doc.isActive,
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organizationId: string, data: Partial<Sequence>): Promise<Sequence> {
    const created = new this.sequenceModel({
      ...data,
      organizationId: new Types.ObjectId(organizationId),
    });
    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findById(organizationId: string, id: string): Promise<Sequence | null> {
    const doc = await this.sequenceModel.findOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return doc ? this.mapToEntity(doc) : null;
  }

  async findByOrganization(organizationId: string): Promise<Sequence[]> {
    const docs = await this.sequenceModel.find({
      organizationId: new Types.ObjectId(organizationId),
    }).sort({ createdAt: -1 }).exec();
    return docs.map(d => this.mapToEntity(d));
  }

  async update(organizationId: string, id: string, updates: Partial<Sequence>): Promise<Sequence | null> {
    const updated = await this.sequenceModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), organizationId: new Types.ObjectId(organizationId) },
      { $set: updates },
      { new: true }
    ).exec();
    return updated ? this.mapToEntity(updated) : null;
  }

  async delete(organizationId: string, id: string): Promise<boolean> {
    const result = await this.sequenceModel.deleteOne({
      _id: new Types.ObjectId(id),
      organizationId: new Types.ObjectId(organizationId),
    }).exec();
    return result.deletedCount === 1;
  }
}

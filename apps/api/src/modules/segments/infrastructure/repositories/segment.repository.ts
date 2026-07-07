import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SegmentDocument } from '../schemas/segment.schema';
import { ISegmentRepository } from '../../domain/repositories/segment.repository.interface';

@Injectable()
export class SegmentRepository implements ISegmentRepository {
  constructor(
    @InjectModel(SegmentDocument.name) private readonly segmentModel: Model<SegmentDocument>,
  ) {}

  async create(segment: Partial<SegmentDocument>): Promise<SegmentDocument> {
    const newSegment = new this.segmentModel(segment);
    return newSegment.save();
  }

  async findById(id: string): Promise<SegmentDocument | null> {
    return this.segmentModel.findById(id).exec();
  }

  async find(filter: Record<string, any>): Promise<SegmentDocument[]> {
    return this.segmentModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async update(id: string, segment: Partial<SegmentDocument>): Promise<SegmentDocument | null> {
    return this.segmentModel.findByIdAndUpdate(id, segment, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.segmentModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { SEGMENT_REPOSITORY } from '../../domain/repositories/segment.repository.interface';
import type { ISegmentRepository } from '../../domain/repositories/segment.repository.interface';
import { SegmentDocument } from '../../infrastructure/schemas/segment.schema';

@Injectable()
export class SegmentsService {
  private readonly logger = new Logger(SegmentsService.name);

  constructor(
    @Inject(SEGMENT_REPOSITORY) private readonly segmentRepo: ISegmentRepository,
  ) {}

  async createSegment(
    organizationId: string,
    authorId: string,
    data: {
      name: string;
      description?: string;
      filters: Record<string, any>;
    },
  ) {
    this.logger.log(`Creating segment for org ${organizationId}`);
    
    return this.segmentRepo.create({
      ...data,
      authorId: new Types.ObjectId(authorId),
      organizationId: new Types.ObjectId(organizationId),
    });
  }

  async getSegments(organizationId: string) {
    const query: any = { organizationId: new Types.ObjectId(organizationId) };
    return this.segmentRepo.find(query);
  }

  async getSegmentById(organizationId: string, segmentId: string) {
    const segment = await this.segmentRepo.findById(segmentId);
    if (!segment || segment.organizationId.toString() !== organizationId) {
      throw new NotFoundException('Segment not found');
    }
    return segment;
  }

  async updateSegment(organizationId: string, segmentId: string, data: Partial<SegmentDocument>) {
    await this.getSegmentById(organizationId, segmentId); // Verify ownership
    
    // Ensure we don't accidentally update organizationId or authorId
    delete data.organizationId;
    delete data.authorId;
    
    return this.segmentRepo.update(segmentId, data);
  }

  async deleteSegment(organizationId: string, segmentId: string) {
    await this.getSegmentById(organizationId, segmentId); // Verify ownership
    return this.segmentRepo.delete(segmentId);
  }
}

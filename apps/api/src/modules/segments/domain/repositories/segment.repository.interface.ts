import { SegmentDocument } from '../../infrastructure/schemas/segment.schema';

export interface ISegmentRepository {
  create(segment: Partial<SegmentDocument>): Promise<SegmentDocument>;
  findById(id: string): Promise<SegmentDocument | null>;
  find(filter: Record<string, any>): Promise<SegmentDocument[]>;
  update(id: string, segment: Partial<SegmentDocument>): Promise<SegmentDocument | null>;
  delete(id: string): Promise<boolean>;
}

export const SEGMENT_REPOSITORY = Symbol('SEGMENT_REPOSITORY');

import { Sequence } from '../entities/sequence.entity';

export interface ISequenceRepository {
  create(organizationId: string, data: Partial<Sequence>): Promise<Sequence>;
  findById(organizationId: string, id: string): Promise<Sequence | null>;
  findByOrganization(organizationId: string): Promise<Sequence[]>;
  update(organizationId: string, id: string, updates: Partial<Sequence>): Promise<Sequence | null>;
  delete(organizationId: string, id: string): Promise<boolean>;
}

export const SEQUENCE_REPOSITORY = Symbol('SEQUENCE_REPOSITORY');

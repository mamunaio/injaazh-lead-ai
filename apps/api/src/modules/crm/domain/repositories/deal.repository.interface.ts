import { DealDocument } from '../../infrastructure/schemas/deal.schema';

export interface IDealRepository {
  create(deal: Partial<DealDocument>): Promise<DealDocument>;
  findByOrganizationId(organizationId: string): Promise<DealDocument[]>;
  findByStageId(stageId: string): Promise<DealDocument[]>;
  findById(id: string): Promise<DealDocument | null>;
  update(id: string, deal: Partial<DealDocument>): Promise<DealDocument | null>;
}

export const DEAL_REPOSITORY = Symbol('DEAL_REPOSITORY');

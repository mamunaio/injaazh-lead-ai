import { Lead } from '../entities/lead.entity';

export interface ILeadRepository {
  create(organizationId: string, lead: Partial<Lead>): Promise<Lead>;
  findById(organizationId: string, id: string): Promise<Lead | null>;
  findByOrganization(organizationId: string, filters?: Record<string, any>): Promise<Lead[]>;
  findByEmail(organizationId: string, email: string): Promise<Lead | null>;
  update(organizationId: string, id: string, lead: Partial<Lead>): Promise<Lead | null>;
  delete(organizationId: string, id: string): Promise<boolean>;
  count(organizationId: string, filters?: Record<string, any>): Promise<number>;
}

export const LEAD_REPOSITORY = Symbol('LEAD_REPOSITORY');

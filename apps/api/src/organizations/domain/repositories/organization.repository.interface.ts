import { Organization } from '../entities/organization.entity';

export interface IOrganizationRepository {
  create(organization: Partial<Organization>): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findByOwnerId(ownerId: string): Promise<Organization[]>;
  update(id: string, organization: Partial<Organization>): Promise<Organization | null>;
  delete(id: string): Promise<boolean>;
}

export const ORGANIZATION_REPOSITORY = Symbol('ORGANIZATION_REPOSITORY');

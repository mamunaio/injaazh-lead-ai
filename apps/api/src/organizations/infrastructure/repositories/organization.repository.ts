import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Organization } from '../../domain/entities/organization.entity';
import { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { OrganizationDocument } from '../schemas/organization.schema';

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  constructor(
    @InjectModel(OrganizationDocument.name) private readonly orgModel: Model<OrganizationDocument>,
  ) {}

  private mapToEntity(doc: OrganizationDocument): Organization {
    return new Organization(
      doc._id.toString(),
      doc.name,
      doc.ownerId.toString(),
      doc.domain,
      doc.status as 'Active' | 'Suspended',
      (doc as any).createdAt,
      (doc as any).updatedAt,
    );
  }

  async create(organization: Partial<Organization>): Promise<Organization> {
    const createdOrg = new this.orgModel({
      ...organization,
      ownerId: new Types.ObjectId(organization.ownerId),
    });
    const saved = await createdOrg.save();
    return this.mapToEntity(saved);
  }

  async findById(id: string): Promise<Organization | null> {
    const org = await this.orgModel.findById(id).exec();
    if (!org) return null;
    return this.mapToEntity(org);
  }

  async findByOwnerId(ownerId: string): Promise<Organization[]> {
    const orgs = await this.orgModel.find({ ownerId: new Types.ObjectId(ownerId) }).exec();
    return orgs.map(org => this.mapToEntity(org));
  }

  async update(id: string, organization: Partial<Organization>): Promise<Organization | null> {
    const updated = await this.orgModel
      .findByIdAndUpdate(id, organization, { new: true })
      .exec();
    if (!updated) return null;
    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.orgModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

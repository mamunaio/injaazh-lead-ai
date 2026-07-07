import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ILeadRepository } from '../../domain/repositories/lead.repository.interface';
import { LEAD_REPOSITORY } from '../../domain/repositories/lead.repository.interface';
import { CreateLeadDto } from '../../presentation/dto/create-lead.dto';
import { UpdateLeadDto } from '../../presentation/dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @Inject(LEAD_REPOSITORY)
    private readonly leadRepository: ILeadRepository,
  ) {}

  async create(organizationId: string, createDto: CreateLeadDto) {
    if (!organizationId) {
      throw new NotFoundException('Organization ID is missing from user context');
    }
    return this.leadRepository.create(organizationId, createDto);
  }

  async findById(organizationId: string, id: string) {
    if (!organizationId) {
      throw new NotFoundException('Organization ID is missing from user context');
    }
    const lead = await this.leadRepository.findById(organizationId, id);
    if (!lead) {
      throw new NotFoundException('Lead not found in your organization');
    }
    return lead;
  }

  async findByOrganization(organizationId: string, filters: Record<string, any> = {}) {
    if (!organizationId) {
      throw new NotFoundException('Organization ID is missing from user context');
    }
    return this.leadRepository.findByOrganization(organizationId, filters);
  }

  async update(organizationId: string, id: string, updateDto: UpdateLeadDto) {
    if (!organizationId) {
      throw new NotFoundException('Organization ID is missing from user context');
    }
    const updated = await this.leadRepository.update(organizationId, id, updateDto);
    if (!updated) {
      throw new NotFoundException('Lead not found in your organization');
    }
    return updated;
  }

  async delete(organizationId: string, id: string) {
    if (!organizationId) {
      throw new NotFoundException('Organization ID is missing from user context');
    }
    const deleted = await this.leadRepository.delete(organizationId, id);
    if (!deleted) {
      throw new NotFoundException('Lead not found in your organization');
    }
    return deleted;
  }

  async addTagToLead(organizationId: string, id: string, tag: string) {
    const lead = await this.findById(organizationId, id);
    const tags = lead.tags || [];
    if (!tags.includes(tag)) {
        tags.push(tag);
        return this.update(organizationId, id, { tags } as any);
    }
    return lead;
  }

  async removeTagFromLead(organizationId: string, id: string, tag: string) {
    const lead = await this.findById(organizationId, id);
    let tags = lead.tags || [];
    if (tags.includes(tag)) {
        tags = tags.filter(t => t !== tag);
        return this.update(organizationId, id, { tags } as any);
    }
    return lead;
  }
}

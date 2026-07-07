import { Injectable, Inject } from '@nestjs/common';
import type { IOrganizationRepository } from '../../domain/repositories/organization.repository.interface';
import { ORGANIZATION_REPOSITORY } from '../../domain/repositories/organization.repository.interface';
import { CreateOrganizationDto } from '../../presentation/dto/create-organization.dto';
import { UpdateOrganizationDto } from '../../presentation/dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY)
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async create(createDto: CreateOrganizationDto & { ownerId: string }) {
    return this.organizationRepository.create(createDto);
  }

  async findById(id: string) {
    return this.organizationRepository.findById(id);
  }

  async findByOwnerId(ownerId: string) {
    return this.organizationRepository.findByOwnerId(ownerId);
  }

  async update(id: string, updateDto: UpdateOrganizationDto) {
    return this.organizationRepository.update(id, updateDto);
  }

  async delete(id: string) {
    return this.organizationRepository.delete(id);
  }
}

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PROMPT_TEMPLATE_REPOSITORY } from '../../domain/repositories/prompt-template.repository.interface';
import type { IPromptTemplateRepository } from '../../domain/repositories/prompt-template.repository.interface';
import { PromptTemplate } from '../../domain/entities/prompt-template.entity';
import { PromptTemplateType } from '../../domain/enums/prompt-template-type.enum';

@Injectable()
export class PromptTemplateService {
  constructor(
    @Inject(PROMPT_TEMPLATE_REPOSITORY)
    private readonly repository: IPromptTemplateRepository,
  ) {}

  async create(data: {
    name: string;
    type: PromptTemplateType;
    content: string;
    variables?: string[];
    organizationId: string;
    isActive?: boolean;
  }): Promise<PromptTemplate> {
    const template = new PromptTemplate({
      name: data.name,
      type: data.type,
      content: data.content,
      variables: data.variables || [],
      organizationId: data.organizationId,
      isActive: data.isActive ?? true,
    });
    return this.repository.create(template);
  }

  async findAllByOrganization(organizationId: string): Promise<PromptTemplate[]> {
    return this.repository.findByOrganizationId(organizationId);
  }

  async findByType(organizationId: string, type: PromptTemplateType): Promise<PromptTemplate[]> {
    return this.repository.findByType(organizationId, type);
  }

  async findById(id: string, organizationId: string): Promise<PromptTemplate> {
    const template = await this.repository.findById(id);
    if (!template || template.organizationId !== organizationId) {
      throw new NotFoundException(`PromptTemplate with ID ${id} not found`);
    }
    return template;
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      content?: string;
      variables?: string[];
      isActive?: boolean;
    },
  ): Promise<PromptTemplate> {
    const template = await this.findById(id, organizationId);
    template.update(data);
    return this.repository.update(template);
  }

  async delete(id: string, organizationId: string): Promise<boolean> {
    // Ensure it exists and belongs to the org
    await this.findById(id, organizationId);
    return this.repository.delete(id);
  }
}

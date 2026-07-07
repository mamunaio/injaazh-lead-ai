import { PromptTemplate } from '../entities/prompt-template.entity';
import { PromptTemplateType } from '../enums/prompt-template-type.enum';

export const PROMPT_TEMPLATE_REPOSITORY = 'PROMPT_TEMPLATE_REPOSITORY';

export interface IPromptTemplateRepository {
  create(template: PromptTemplate): Promise<PromptTemplate>;
  findById(id: string): Promise<PromptTemplate | null>;
  findByOrganizationId(organizationId: string): Promise<PromptTemplate[]>;
  findByType(organizationId: string, type: PromptTemplateType): Promise<PromptTemplate[]>;
  update(template: PromptTemplate): Promise<PromptTemplate>;
  delete(id: string): Promise<boolean>;
}

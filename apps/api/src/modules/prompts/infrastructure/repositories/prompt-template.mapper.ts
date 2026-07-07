import { PromptTemplate as DomainPromptTemplate } from '../../domain/entities/prompt-template.entity';
import { PromptTemplateDocument } from '../schemas/prompt-template.schema';

export class PromptTemplateMapper {
  static toDomain(raw: PromptTemplateDocument): DomainPromptTemplate {
    return new DomainPromptTemplate({
      id: raw._id.toString(),
      name: raw.name,
      type: raw.type,
      content: raw.content,
      variables: raw.variables,
      organizationId: raw.organizationId.toString(),
      isActive: raw.isActive,
      createdAt: (raw as any).createdAt,
      updatedAt: (raw as any).updatedAt,
    });
  }
}

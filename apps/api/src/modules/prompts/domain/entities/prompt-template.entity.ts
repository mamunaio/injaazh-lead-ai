import { PromptTemplateType } from '../enums/prompt-template-type.enum';

export interface PromptTemplateProps {
  id?: string;
  name: string;
  type: PromptTemplateType;
  content: string;
  variables: string[];
  organizationId: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PromptTemplate {
  private props: PromptTemplateProps;

  constructor(props: PromptTemplateProps) {
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      variables: props.variables || [],
    };
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): PromptTemplateType {
    return this.props.type;
  }

  get content(): string {
    return this.props.content;
  }

  get variables(): string[] {
    return this.props.variables;
  }

  get organizationId(): string {
    return this.props.organizationId;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  update(props: Partial<PromptTemplateProps>): void {
    if (props.name !== undefined) this.props.name = props.name;
    if (props.content !== undefined) this.props.content = props.content;
    if (props.variables !== undefined) this.props.variables = props.variables;
    if (props.isActive !== undefined) this.props.isActive = props.isActive;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      content: this.content,
      variables: this.variables,
      organizationId: this.organizationId,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

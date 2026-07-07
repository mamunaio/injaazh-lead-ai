import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { PromptTemplateType } from '../../domain/enums/prompt-template-type.enum';

export type PromptTemplateDocument = PromptTemplate & Document;

@Schema({ timestamps: true, collection: 'prompt_templates' })
export class PromptTemplate {
  @Prop({ required: true, type: String })
  name!: string;

  @Prop({ required: true, enum: PromptTemplateType, type: String })
  type!: PromptTemplateType;

  @Prop({ required: true, type: String })
  content!: string;

  @Prop({ type: [String], default: [] })
  variables!: string[];

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, index: true })
  organizationId!: MongooseSchema.Types.ObjectId;

  @Prop({ default: true, type: Boolean })
  isActive!: boolean;
}

export const PromptTemplateSchema = SchemaFactory.createForClass(PromptTemplate);

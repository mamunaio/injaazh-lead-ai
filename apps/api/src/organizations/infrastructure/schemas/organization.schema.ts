import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrganizationDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: null })
  domain!: string | null;

  @Prop({ type: Types.ObjectId, required: true })
  ownerId!: Types.ObjectId;

  @Prop({ default: 'Active', enum: ['Active', 'Suspended'] })
  status!: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(OrganizationDocument);

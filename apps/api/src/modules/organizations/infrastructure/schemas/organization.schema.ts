import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class OrganizationDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: String, default: null })
  domain!: string | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  ownerId!: Types.ObjectId;

  @Prop({ default: 'Active', enum: ['Active', 'Suspended'] })
  status!: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(OrganizationDocument);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CampaignDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, enum: ['Draft', 'Active', 'Paused', 'Completed', 'Stopped'], default: 'Draft' })
  status!: string;

  @Prop({ type: String, default: null })
  leadSegmentId!: string | null;

  @Prop({ type: String, default: null })
  promptTemplateId!: string | null;

  @Prop({ type: String, default: null })
  sequenceId!: string | null;

  @Prop({ type: String, default: null })
  schedule!: string | null;
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignDocument);

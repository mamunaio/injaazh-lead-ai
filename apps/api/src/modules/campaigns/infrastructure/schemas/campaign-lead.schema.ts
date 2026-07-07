import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class CampaignLeadDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  campaignId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  leadId!: Types.ObjectId;

  @Prop({ required: true, enum: ['Enrolled', 'Processing', 'Completed', 'Failed'], default: 'Enrolled' })
  status!: string;

  @Prop({ type: Date, default: null })
  sentAt!: Date | null;

  @Prop({ type: Number, default: 0 })
  currentSequenceStep!: number;

  @Prop({ type: Date, default: null })
  nextActionDate!: Date | null;

  @Prop({ type: Boolean, default: false })
  hasReplied!: boolean;
}

const CampaignLeadSchema = SchemaFactory.createForClass(CampaignLeadDocument);

// Ensure a lead is only enrolled once per campaign
CampaignLeadSchema.index({ campaignId: 1, leadId: 1 }, { unique: true });

export { CampaignLeadSchema };

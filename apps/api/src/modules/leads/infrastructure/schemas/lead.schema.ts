import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class LeadDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ default: null })
  lastName!: string;

  @Prop({ default: null })
  email!: string;

  @Prop({ default: null })
  phone!: string;

  @Prop({
    default: 'New',
    enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Won'],
  })
  status!: string;

  @Prop({ default: null })
  source!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  assignedTo!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  websiteAnalysis!: any | null;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  aiOutreach!: any | null;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  prospectIntelligence!: any | null;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  aiContext!: any | null;
}

export const LeadSchema = SchemaFactory.createForClass(LeadDocument);

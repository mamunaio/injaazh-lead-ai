import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class EmailEventDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true, index: true })
  messageId!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  campaignId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  leadId!: Types.ObjectId;

  @Prop({ required: true, enum: ['Delivered', 'Opened', 'Clicked', 'Replied', 'Bounced', 'Unsubscribed'] })
  type!: string;

  @Prop()
  userAgent?: string;

  @Prop()
  ipAddress?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;
}

export const EmailEventSchema = SchemaFactory.createForClass(EmailEventDocument);

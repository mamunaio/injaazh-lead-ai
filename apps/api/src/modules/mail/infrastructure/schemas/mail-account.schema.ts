import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class MailAccountDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true, enum: ['Gmail', 'Microsoft365', 'SendGrid', 'AmazonSES', 'Resend'] })
  provider!: string;

  @Prop({ type: Object, required: true })
  credentials!: any;

  @Prop({ default: false })
  isDefault!: boolean;

  @Prop({ required: true })
  fromEmail!: string;

  @Prop({ required: true })
  fromName!: string;
}

export const MailAccountSchema = SchemaFactory.createForClass(MailAccountDocument);

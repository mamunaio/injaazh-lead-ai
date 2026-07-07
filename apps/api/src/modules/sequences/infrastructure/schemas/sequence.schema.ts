import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { SequenceStep } from '../../domain/entities/sequence.entity';

@Schema({ timestamps: true })
export class SequenceDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ type: Array, required: true, default: [] })
  steps!: SequenceStep[];

  @Prop({ type: Boolean, default: true })
  stopOnReply!: boolean;

  @Prop({ type: Boolean, default: true })
  isActive!: boolean;
}

export const SequenceSchema = SchemaFactory.createForClass(SequenceDocument);

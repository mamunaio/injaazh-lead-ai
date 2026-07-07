import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class SegmentDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  filters!: Record<string, any>;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  authorId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const SegmentSchema = SchemaFactory.createForClass(SegmentDocument);

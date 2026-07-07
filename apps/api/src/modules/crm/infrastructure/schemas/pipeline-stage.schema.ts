import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PipelineStageDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true, index: true })
  pipelineId!: Types.ObjectId;

  @Prop({ required: true })
  order!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const PipelineStageSchema = SchemaFactory.createForClass(PipelineStageDocument);

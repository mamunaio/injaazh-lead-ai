import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DealDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: 0 })
  value!: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true, index: true })
  leadId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PipelineStage', required: true, index: true })
  stageId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const DealSchema = SchemaFactory.createForClass(DealDocument);

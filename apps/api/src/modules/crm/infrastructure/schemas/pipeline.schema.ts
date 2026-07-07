import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class PipelineDocument extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const PipelineSchema = SchemaFactory.createForClass(PipelineDocument);

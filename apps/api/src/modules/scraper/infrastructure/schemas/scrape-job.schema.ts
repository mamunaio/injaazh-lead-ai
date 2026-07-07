import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ScrapeJobDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ required: true, enum: ['GoogleMaps', 'Website', 'LinkedIn', 'CSV'] })
  type!: string;

  @Prop({ required: true, enum: ['Pending', 'Processing', 'Completed', 'Failed'], default: 'Pending' })
  status!: string;

  @Prop({ type: Object, required: true })
  parameters!: any;

  @Prop({ default: 0 })
  progress!: number;

  @Prop({ default: 0 })
  resultCount!: number;

  @Prop({ default: null })
  error!: string;
}

export const ScrapeJobSchema = SchemaFactory.createForClass(ScrapeJobDocument);

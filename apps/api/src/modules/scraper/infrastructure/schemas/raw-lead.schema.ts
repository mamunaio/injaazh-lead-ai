import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RawLeadDocument extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  scrapeJobId!: Types.ObjectId;

  @Prop({ required: true })
  sourceType!: string;

  @Prop({ required: true })
  sourceId!: string;

  @Prop({ type: Object, required: true })
  rawData!: any;

  @Prop({ default: false })
  processed!: boolean;
}

const RawLeadSchema = SchemaFactory.createForClass(RawLeadDocument);

// Prevent duplicates for the same sourceId within the same organization
RawLeadSchema.index({ organizationId: 1, sourceId: 1 }, { unique: true });

export { RawLeadSchema };

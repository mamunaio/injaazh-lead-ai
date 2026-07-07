import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class NoteDocument extends Document {
  @Prop({ required: true })
  content!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', index: true })
  leadId?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Deal', index: true })
  dealId?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  authorId!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(NoteDocument);

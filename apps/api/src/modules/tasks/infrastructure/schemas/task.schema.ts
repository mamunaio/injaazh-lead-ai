import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TaskDocument extends Document {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ required: true, enum: ['Call', 'Email', 'Meeting', 'To-Do'], default: 'To-Do' })
  type!: string;

  @Prop({ required: true, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' })
  status!: string;

  @Prop({ required: true })
  dueDate!: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Lead', index: true })
  leadId?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Deal', index: true })
  dealId?: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true })
  assignedTo!: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, index: true })
  organizationId!: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  organizationId!: Types.ObjectId;

  @Prop({ type: [String], default: ['Member'] })
  roles!: string[];

  @Prop({ default: 'Active', enum: ['Active', 'Suspended'] })
  status!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

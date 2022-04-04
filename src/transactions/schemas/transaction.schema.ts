import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { Double } from 'bson';

export type TransactionDocument = Transaction & Document;

@Schema({
  collection: 'transactions',
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
})
export class Transaction {
  _id: ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  user_id: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: Double;

  @Prop({ required: true })
  category: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

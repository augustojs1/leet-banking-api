import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

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
  ammount: number;

  @Prop({ required: true })
  category: string;

  @Prop({
    required: true,
    enum: ['income', 'expense'],
  })
  type: 'income' | 'expense';
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

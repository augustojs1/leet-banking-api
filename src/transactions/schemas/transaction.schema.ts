import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TransactionDocument = Transaction & Document;

@Schema({
  collection: 'transactions',
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
})
export class Transaction {
  @ApiProperty()
  _id: ObjectId;

  @Prop({ type: mongoose.Types.ObjectId, required: true })
  @ApiProperty()
  user_id: ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  ammount: number;

  @Prop({ required: true })
  @ApiProperty()
  category: string;

  @Prop({
    required: true,
    enum: ['income', 'expense'],
  })
  @ApiProperty()
  type: 'income' | 'expense';
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

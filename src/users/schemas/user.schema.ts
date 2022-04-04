import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'update_at' },
})
export class User {
  @ApiProperty()
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  @ApiProperty()
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

import { ObjectId } from 'mongodb';

export interface TokenPayload {
  userId: ObjectId;
}

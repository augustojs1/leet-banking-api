import { HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export function validObjectId(id: string): void {
  const idIsValid = ObjectId.isValid(id);

  if (!idIsValid) {
    throw new HttpException('Invalid ObjectId', HttpStatus.BAD_REQUEST);
  }
}

import { Double } from 'bson';
import { IsNumber, IsString, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: Double | number;

  @IsString()
  @IsNotEmpty()
  category: string;
}

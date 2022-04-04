import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { TransactionTypeEnum } from '../enum/transaction-type.enum';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  ammount: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  type: TransactionTypeEnum;
}

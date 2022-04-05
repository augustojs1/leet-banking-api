import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  ammount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  @ApiProperty()
  type: TransactionTypeEnum;
}

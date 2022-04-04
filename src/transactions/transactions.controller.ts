import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { ObjectId } from 'mongodb';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const userId: ObjectId = request.user._id;

    return this.transactionsService.create(userId, createTransactionDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public async findAll(@Req() request: RequestWithUser) {
    const userId: ObjectId = request.user._id;

    return await this.transactionsService.findAll(userId);
  }
}

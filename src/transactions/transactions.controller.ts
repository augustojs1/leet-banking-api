import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { ObjectId } from 'mongodb';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBearerAuth()
  create(
    @Req() request: RequestWithUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(request.user, createTransactionDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiBearerAuth()
  public async findAll(@Req() request: RequestWithUser) {
    const userId: ObjectId = request.user._id;

    return await this.transactionsService.findAll(userId);
  }
}

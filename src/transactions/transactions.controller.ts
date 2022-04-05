import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from 'src/authentication/guard/jwt-authentication.guard';
import { ObjectId } from 'mongodb';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Transaction } from './schemas/transaction.schema';

@Controller('api/v1/transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'New transaction successfully created.',
    type: Transaction,
  })
  @ApiResponse({
    status: 400,
    description: 'You have insuficient funds.',
  })
  @ApiOperation({
    summary: 'Create a new transaction for the authenticated user.',
  })
  @ApiBody({ type: CreateTransactionDto })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User should be authenticated.',
  })
  create(
    @Req() request: RequestWithUser,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionsService.create(request.user, createTransactionDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns all authenticated user transactions.',
    type: Transaction,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. User should be authenticated.',
  })
  @ApiOperation({
    summary: 'Returns all authenticated user transactions.',
  })
  public async findAll(@Req() request: RequestWithUser) {
    const userId: ObjectId = request.user._id;

    return await this.transactionsService.findAll(userId);
  }
}

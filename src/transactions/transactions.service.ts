import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import RequestWithUser from 'src/authentication/interfaces/requestWithUser.interface';
import { validObjectId } from 'src/utils/validObjectId';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  public async create(
    userId: ObjectId,
    createTransactionData: CreateTransactionDto,
  ) {
    validObjectId(userId);

    const newTransaction = new this.transactionModel({
      user_id: userId,
      ...createTransactionData,
    });
    const transaction = await newTransaction.save();
    return transaction;
  }

  public async findAll(userId: ObjectId) {
    const transactions = await this.transactionModel.find({ user_id: userId });
    return transactions;
  }
}

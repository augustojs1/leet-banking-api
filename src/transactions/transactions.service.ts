import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { validObjectId } from 'src/utils/validObjectId';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,

    private readonly usersService: UsersService,
  ) {}

  public async create(user: User, createTransactionData: CreateTransactionDto) {
    validObjectId(user._id);

    await this.usersService.updateBalance(
      user,
      createTransactionData.type,
      createTransactionData.ammount,
    );

    const newTransaction = new this.transactionModel({
      user_id: user._id,
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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { validObjectId } from 'src/utils/validObjectId';
import { ObjectId } from 'mongodb';
import { Double } from 'bson';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });

    if (user) {
      return user;
    }

    return null;
  }

  public async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const user = await createUser.save();
    return user;
  }

  public async findById(userId: string | ObjectId) {
    validObjectId(userId);

    const user = await this.userModel.findOne({ _id: userId });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async updateBalance(
    user: User,
    transactionType: 'income' | 'expense',
    ammount: number,
  ): Promise<any> {
    let updatedBalance = 0;

    if (transactionType === 'income') {
      updatedBalance = user.balance += ammount;

      await this.userModel.updateOne(
        {
          _id: user._id,
        },
        {
          balance: updatedBalance,
        },
      );
    }

    if (transactionType === 'expense') {
      if (user.balance >= ammount) {
        updatedBalance = user.balance -= ammount;

        await this.userModel.updateOne(
          {
            _id: user._id,
          },
          {
            balance: updatedBalance,
          },
        );
      } else {
        throw new HttpException(
          'You have insuficient funds',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

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

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async create(createUserDto: CreateUserDto) {
    const appraiser = new this.userModel(createUserDto);
    const user = await appraiser.save();
    return user;
  }
}

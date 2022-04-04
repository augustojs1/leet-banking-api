import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UsersService) {}

  public async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const createdUser = await this.userService.create({
      ...registerData,
      password: hashedPassword,
    });
  }

  public async login(loginData: LoginDto) {
    const user = await this.userService.findByEmail(loginData.email);

    await this.verifyPassword(loginData.password, user.password);

    user.password = undefined;
    return user;
  }

  private async verifyPassword(userPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      userPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

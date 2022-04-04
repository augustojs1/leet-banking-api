import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

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

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    const user = await this.userService.findByEmail(email);

    await this.verifyPassword(hashedPassword, user.password);

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

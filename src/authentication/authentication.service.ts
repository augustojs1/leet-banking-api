import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ObjectId } from 'mongodb';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public getCookieWithJwtToken(userId: ObjectId) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const createdUser = await this.userService.create({
      ...registerData,
      password: hashedPassword,
    });

    return createdUser;
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

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}

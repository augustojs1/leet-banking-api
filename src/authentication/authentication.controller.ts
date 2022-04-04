import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { LocalAuthenticationGuard } from './guard/localAuthentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import JwtAuthenticationGuard from './guard/jwt-authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  public async register(@Body() registerData: RegisterDto) {
    return await this.authenticationService.register(registerData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  public async login(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user._id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  public async logOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('me')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

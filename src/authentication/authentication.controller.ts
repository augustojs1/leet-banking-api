import {
  Controller,
  Get,
  Post,
  Body,
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

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Controller('api/v1/authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiBadRequestResponse({
    description: 'User with this email already exists.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered.',
    type: User,
  })
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: 'Register a new user.' })
  public async register(@Body() registerData: RegisterDto) {
    return await this.authenticationService.register(registerData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiOkResponse({ description: 'User successfully logged in.' })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials provided.' })
  @ApiOperation({ summary: 'Login with an existent user.' })
  @ApiBody({ type: LoginDto })
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
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User successfully logged out.' })
  @ApiUnauthorizedResponse({ description: 'User should be authenticated' })
  @ApiOperation({ summary: 'Logout from server' })
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
  @ApiOkResponse({ description: 'Returning authenticated user.' })
  @ApiUnauthorizedResponse({ description: 'User should be authenticated' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return authenticated user' })
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

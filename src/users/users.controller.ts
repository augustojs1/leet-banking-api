import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}

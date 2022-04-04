import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  imports: [UsersModule],
})
export class AuthenticationModule {}

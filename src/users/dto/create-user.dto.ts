import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;
}

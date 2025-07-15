import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
import { IsString, MinLength, MaxLength, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  phone: string;

  
  @IsOptional()
  @IsEnum(['user', 'admin'])
  role?: 'user' | 'admin';
}
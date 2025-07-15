import { PartialType } from '@nestjs/mapped-types';
import { CreatePasswordResetCodeDto } from './create-password_reset_code.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdatePasswordResetCodeDto extends PartialType(CreatePasswordResetCodeDto) {

     @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code?: string;

  @IsOptional()
  @IsDateString()
  expires_at?: string;
}

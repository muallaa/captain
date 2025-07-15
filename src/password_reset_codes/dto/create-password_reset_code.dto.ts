import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreatePasswordResetCodeDto {
      @IsInt()
  user_id: number;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;

  @IsDateString()
  expires_at: string;
}

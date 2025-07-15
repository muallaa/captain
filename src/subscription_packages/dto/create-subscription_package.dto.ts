import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateSubscriptionPackageDto {

     @IsString()
  @MinLength(1)
  @MaxLength(255)
  package_name: string;

  @IsInt()
  duration_days: number;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscriptionPackageDto } from './create-subscription_package.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateSubscriptionPackageDto extends PartialType(CreateSubscriptionPackageDto) {

     @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  package_name?: string;

  @IsOptional()
  @IsInt()
  duration_days?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSubscriptionDto } from './create-user_subscription.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateUserSubscriptionDto extends PartialType(CreateUserSubscriptionDto) {

      @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  package_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  payment_proof?: string;

  @IsOptional()
  @IsEnum(['Pending', 'Approved', 'Rejected', 'Expired'])
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Expired';

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string;
}

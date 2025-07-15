import { IsInt, IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';

export class CreateUserSubscriptionDto {

  @IsOptional()
  @IsString()
  user_id: number;

  @IsString()
  package_id: number;

  @IsOptional()
  @IsEnum(['Pending', 'Approved', 'Rejected', 'Expired'])
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Expired';

  @IsOptional()
  @IsDateString()
  start_date?: string;

  @IsOptional()
  @IsDateString()
  end_date?: string; // Ignored in service
}
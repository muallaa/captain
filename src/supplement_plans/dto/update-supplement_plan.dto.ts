import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplementPlanDto } from './create-supplement_plan.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateSupplementPlanDto extends PartialType(CreateSupplementPlanDto) {

      @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  plan_details?: string;
}

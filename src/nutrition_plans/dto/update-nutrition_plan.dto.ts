import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionPlanDto } from './create-nutrition_plan.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';


export class UpdateNutritionPlanDto extends PartialType(CreateNutritionPlanDto) {

     @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsString()
  plan_details?: string;
}

import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateSupplementPlanDto {

      @IsInt()
  user_id: number;

  @IsString()
  plan_details: string;
}

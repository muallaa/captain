import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutProgramDto } from './create-workout_program.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateWorkoutProgramDto extends PartialType(CreateWorkoutProgramDto) {



  @IsOptional()
  @IsEnum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
  day_of_week?: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';


export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {

    @IsOptional()
  @IsInt()
  program_id?: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  exercise_name?: string;

  @IsOptional()
  @IsString()
  details?: string;
}

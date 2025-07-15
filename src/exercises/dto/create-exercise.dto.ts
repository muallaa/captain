import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateExerciseDto {

     @IsInt()
  program_id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  exercise_name: string;

  @IsString()
  details: string;
}

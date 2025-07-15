import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class CreateExerciseVideoDto {

      @IsInt()
  exercise_id: number;

  @IsString()
  @IsUrl()
  @MaxLength(255)
  video_url: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseVideoDto } from './create-exercise_video.dto';
import { IsString, IsInt, IsNumber, IsEnum, IsOptional, IsDateString, MinLength, MaxLength, IsUrl } from 'class-validator';

export class UpdateExerciseVideoDto extends PartialType(CreateExerciseVideoDto) {

    @IsOptional()
  @IsInt()
  exercise_id?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  video_url?: string;
}

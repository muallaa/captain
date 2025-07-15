import { Module } from '@nestjs/common';
import { ExerciseVideosService } from './exercise_videos.service';
import { ExerciseVideosController } from './exercise_videos.controller';

@Module({
  controllers: [ExerciseVideosController],
  providers: [ExerciseVideosService],
})
export class ExerciseVideosModule {}

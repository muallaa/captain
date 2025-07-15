import { Injectable } from '@nestjs/common';
import { CreateExerciseVideoDto } from './dto/create-exercise_video.dto';
import { UpdateExerciseVideoDto } from './dto/update-exercise_video.dto';

@Injectable()
export class ExerciseVideosService {
  create(createExerciseVideoDto: CreateExerciseVideoDto) {
    return 'This action adds a new exerciseVideo';
  }

  findAll() {
    return `This action returns all exerciseVideos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exerciseVideo`;
  }

  update(id: number, updateExerciseVideoDto: UpdateExerciseVideoDto) {
    return `This action updates a #${id} exerciseVideo`;
  }

  remove(id: number) {
    return `This action removes a #${id} exerciseVideo`;
  }
}

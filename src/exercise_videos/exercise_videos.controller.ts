import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseVideosService } from './exercise_videos.service';
import { CreateExerciseVideoDto } from './dto/create-exercise_video.dto';
import { UpdateExerciseVideoDto } from './dto/update-exercise_video.dto';

@Controller('exercise-videos')
export class ExerciseVideosController {
  constructor(private readonly exerciseVideosService: ExerciseVideosService) {}

  @Post()
  create(@Body() createExerciseVideoDto: CreateExerciseVideoDto) {
    return this.exerciseVideosService.create(createExerciseVideoDto);
  }

  @Get()
  findAll() {
    return this.exerciseVideosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseVideosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseVideoDto: UpdateExerciseVideoDto) {
    return this.exerciseVideosService.update(+id, updateExerciseVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseVideosService.remove(+id);
  }
}

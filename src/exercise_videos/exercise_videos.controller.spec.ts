import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseVideosController } from './exercise_videos.controller';
import { ExerciseVideosService } from './exercise_videos.service';

describe('ExerciseVideosController', () => {
  let controller: ExerciseVideosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseVideosController],
      providers: [ExerciseVideosService],
    }).compile();

    controller = module.get<ExerciseVideosController>(ExerciseVideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

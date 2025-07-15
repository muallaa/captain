import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseVideosService } from './exercise_videos.service';

describe('ExerciseVideosService', () => {
  let service: ExerciseVideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseVideosService],
    }).compile();

    service = module.get<ExerciseVideosService>(ExerciseVideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutProgramsController } from './workout_programs.controller';
import { WorkoutProgramsService } from './workout_programs.service';

describe('WorkoutProgramsController', () => {
  let controller: WorkoutProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutProgramsController],
      providers: [WorkoutProgramsService],
    }).compile();

    controller = module.get<WorkoutProgramsController>(WorkoutProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

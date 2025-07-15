import { Test, TestingModule } from '@nestjs/testing';
import { CoachCommunicationsController } from './coach_communications.controller';
import { CoachCommunicationsService } from './coach_communications.service';

describe('CoachCommunicationsController', () => {
  let controller: CoachCommunicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachCommunicationsController],
      providers: [CoachCommunicationsService],
    }).compile();

    controller = module.get<CoachCommunicationsController>(CoachCommunicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CoachCommunicationsService } from './coach_communications.service';

describe('CoachCommunicationsService', () => {
  let service: CoachCommunicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachCommunicationsService],
    }).compile();

    service = module.get<CoachCommunicationsService>(CoachCommunicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

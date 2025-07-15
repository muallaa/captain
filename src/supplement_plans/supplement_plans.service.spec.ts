import { Test, TestingModule } from '@nestjs/testing';
import { SupplementPlansService } from './supplement_plans.service';

describe('SupplementPlansService', () => {
  let service: SupplementPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplementPlansService],
    }).compile();

    service = module.get<SupplementPlansService>(SupplementPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

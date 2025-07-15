import { Test, TestingModule } from '@nestjs/testing';
import { SupplementPlansController } from './supplement_plans.controller';
import { SupplementPlansService } from './supplement_plans.service';

describe('SupplementPlansController', () => {
  let controller: SupplementPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplementPlansController],
      providers: [SupplementPlansService],
    }).compile();

    controller = module.get<SupplementPlansController>(SupplementPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

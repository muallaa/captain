import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPackagesController } from './subscription_packages.controller';
import { SubscriptionPackagesService } from './subscription_packages.service';

describe('SubscriptionPackagesController', () => {
  let controller: SubscriptionPackagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionPackagesController],
      providers: [SubscriptionPackagesService],
    }).compile();

    controller = module.get<SubscriptionPackagesController>(SubscriptionPackagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

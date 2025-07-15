import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPackagesService } from './subscription_packages.service';

describe('SubscriptionPackagesService', () => {
  let service: SubscriptionPackagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionPackagesService],
    }).compile();

    service = module.get<SubscriptionPackagesService>(SubscriptionPackagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PasswordResetCodesController } from './password_reset_codes.controller';
import { PasswordResetCodesService } from './password_reset_codes.service';

describe('PasswordResetCodesController', () => {
  let controller: PasswordResetCodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetCodesController],
      providers: [PasswordResetCodesService],
    }).compile();

    controller = module.get<PasswordResetCodesController>(PasswordResetCodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

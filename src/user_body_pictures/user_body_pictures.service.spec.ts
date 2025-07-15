import { Test, TestingModule } from '@nestjs/testing';
import { UserBodyPicturesService } from './user_body_pictures.service';

describe('UserBodyPicturesService', () => {
  let service: UserBodyPicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBodyPicturesService],
    }).compile();

    service = module.get<UserBodyPicturesService>(UserBodyPicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

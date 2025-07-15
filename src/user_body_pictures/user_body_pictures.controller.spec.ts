import { Test, TestingModule } from '@nestjs/testing';
import { UserBodyPicturesController } from './user_body_pictures.controller';
import { UserBodyPicturesService } from './user_body_pictures.service';

describe('UserBodyPicturesController', () => {
  let controller: UserBodyPicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBodyPicturesController],
      providers: [UserBodyPicturesService],
    }).compile();

    controller = module.get<UserBodyPicturesController>(UserBodyPicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

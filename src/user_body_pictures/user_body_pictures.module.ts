import { Module } from '@nestjs/common';
import { UserBodyPicturesService } from './user_body_pictures.service';
import { UserBodyPicturesController } from './user_body_pictures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBodyPicture } from './entities/user_body_picture.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBodyPicture , User])
  ],
  controllers: [UserBodyPicturesController],
  providers: [UserBodyPicturesService],
})
export class UserBodyPicturesModule {}

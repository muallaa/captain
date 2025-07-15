import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserBodyPictureDto } from './dto/create-user_body_picture.dto';
import { UpdateUserBodyPictureDto } from './dto/update-user_body_picture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBodyPicture } from './entities/user_body_picture.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { unlinkSync } from 'fs';

@Injectable()
export class UserBodyPicturesService {
  constructor(
    @InjectRepository( UserBodyPicture )
    private userBodyPictureRepository: Repository<UserBodyPicture>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createUserBodyPictureDto: CreateUserBodyPictureDto,
    files: Express.Multer.File[],
    currentUser: { sub: number; role: string },
  ): Promise<UserBodyPicture[]> {
    const user_id  = currentUser.sub;

    // if (currentUser.role !== 'admin' && currentUser.sub !== user_id) {
    //   throw new ForbiddenException('You can only upload pictures for yourself');
    // }

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const savedPictures: UserBodyPicture[] = [];
    for (const file of files) {
      const picture = this.userBodyPictureRepository.create({
        user_id,
        picture_url: file.path.replace(/\\/g, '/'), // Normalize path
        user,
      });
      const savedPicture = await this.userBodyPictureRepository.save(picture);
      savedPictures.push(savedPicture);
    }

    return savedPictures;
  }

  async findAll(): Promise<UserBodyPicture[]> {
    return await this.userBodyPictureRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<UserBodyPicture> {
    const picture = await this.userBodyPictureRepository.findOne({ where: { user_id : id }, relations: ['user'] });
    if (!picture) {
      throw new BadRequestException('Body picture not found');
    }
    return picture;
  }

  async update(id: number, file: Express.Multer.File, currentUser: { sub: number; role: string }) {
    const picture = await this.userBodyPictureRepository.findOne({ where: { picture_id : id }, relations: ['user'] });
    if (!picture) {
      throw new BadRequestException('Body picture not found');
    }

    if (currentUser.role !== 'admin' && currentUser.sub !== picture.user_id) {
      throw new ForbiddenException('You can only update your own body pictures');
    }

    // Delete old file if it exists
    if (picture.picture_url) {
      try {
        await unlinkSync(picture.picture_url);
      } catch (error) {
        console.warn(`Failed to delete old file ${picture.picture_url}: ${error.message}`);
        // Continue with update even if file deletion fails (e.g., file already deleted)
      }
    }

    const updateData: Partial<UserBodyPicture> = {
      picture_url: file.path.replace(/\\/g, '/'),
    };

    await this.userBodyPictureRepository.update({ picture_id : id }, updateData);
    return await this.userBodyPictureRepository.findOne({ where: { picture_id :  id }, relations: ['user'] });
  }

  async remove(id: number, currentUser: { sub: number; role: string }) {
    const picture = await this.userBodyPictureRepository.findOne({ where: { user_id : id }, relations: ['user'] });
    if (!picture) {
      throw new BadRequestException('Body picture not found');
    }

    if (currentUser.role !== 'admin' && currentUser.sub !== picture.user_id) {
      throw new ForbiddenException('You can only delete your own body pictures');
    }

    await this.userBodyPictureRepository.delete({ user_id :  id });
    return { message: 'Body picture deleted successfully' };
  }
}

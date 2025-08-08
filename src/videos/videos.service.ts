import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(

    @InjectRepository(Video) private RepoVideo : Repository<Video>

  ){}

  async create(createVideoDto: CreateVideoDto , file: Express.Multer.File) {
   
    try{

     
      createVideoDto.video_url = file.path

      const createVideo = await this.RepoVideo.create(createVideoDto)
      
      this.RepoVideo.save(createVideo)
      return createVideo

    }catch (err){
      throw new BadRequestException('faild create video')
    }

    
  }

  findAll() {
    
    const allVideo = this.RepoVideo.find()

    return allVideo
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
   
    const update = await this.RepoVideo.update({video_id : id} , updateVideoDto)

    return update
  }

  remove(id: number) {
    
    const deleteVideo = this.RepoVideo.delete({video_id : id})

    return deleteVideo
  }
}

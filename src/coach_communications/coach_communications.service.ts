import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachCommunicationDto } from './dto/create-coach_communication.dto';
import { UpdateCoachCommunicationDto } from './dto/update-coach_communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachCommunication } from './entities/coach_communication.entity';
import { Repository } from 'typeorm';
import { IsEmpty } from 'class-validator';

@Injectable()

export class CoachCommunicationsService {

  constructor(
    @InjectRepository(CoachCommunication) private Repocommunication : Repository<CoachCommunication>,

  ){}
  create(createCoachCommunicationDto: CreateCoachCommunicationDto) {
    return 'This action adds a new coachCommunication';
  }

  findAll() {
    return `This action returns all coachCommunications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coachCommunication`;
  }

  update(id: number, updateCoachCommunicationDto: UpdateCoachCommunicationDto) {
    return `This action updates a #${id} coachCommunication`;
  }

  remove(id: number) {
    return `This action removes a #${id} coachCommunication`;
  }

  async communication(){

    const info = await this.Repocommunication.find()

    if(!info.length){
       throw new  NotFoundException('not exits information')
    }

    return info
  }
}

import { Module } from '@nestjs/common';
import { CoachCommunicationsService } from './coach_communications.service';
import { CoachCommunicationsController } from './coach_communications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachCommunication } from './entities/coach_communication.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([CoachCommunication])
  ],
  controllers: [CoachCommunicationsController],
  providers: [CoachCommunicationsService],
})
export class CoachCommunicationsModule {}

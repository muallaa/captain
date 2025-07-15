import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachCommunicationsService } from './coach_communications.service';
import { CreateCoachCommunicationDto } from './dto/create-coach_communication.dto';
import { UpdateCoachCommunicationDto } from './dto/update-coach_communication.dto';

@Controller('coach-communications')
export class CoachCommunicationsController {
  constructor(private readonly coachCommunicationsService: CoachCommunicationsService) {}

  @Post()
  create(@Body() createCoachCommunicationDto: CreateCoachCommunicationDto) {
    return this.coachCommunicationsService.create(createCoachCommunicationDto);
  }

  // @Get()
  // findAll() {
  //   return this.coachCommunicationsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coachCommunicationsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachCommunicationDto: UpdateCoachCommunicationDto) {
    return this.coachCommunicationsService.update(+id, updateCoachCommunicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachCommunicationsService.remove(+id);
  }

  @Get('communication')
  async communication(){
   
      return await this.coachCommunicationsService.communication()
  }
}

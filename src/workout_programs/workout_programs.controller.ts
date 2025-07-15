import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata, Request } from '@nestjs/common';
import { WorkoutProgramsService } from './workout_programs.service';
import { CreateWorkoutProgramDto } from './dto/create-workout_program.dto';
import { UpdateWorkoutProgramDto } from './dto/update-workout_program.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CourseStatusGuard } from 'src/guard/course-status.guard';

@Controller('workout-programs')
export class WorkoutProgramsController {
  constructor(private readonly workoutProgramsService: WorkoutProgramsService) {}

  @Post()
  create(@Body() createWorkoutProgramDto: CreateWorkoutProgramDto) {
    return this.workoutProgramsService.create(createWorkoutProgramDto);
  }

  @Get('findAll')
  findAll() {
    return this.workoutProgramsService.findAll();
  }


  @Get('')
  @UseGuards(JwtAuthGuard , CourseStatusGuard)
  @SetMetadata('course_statuses', ['Active'])
  async findOne(@Request() req : any ) {
    return await this.workoutProgramsService.findOne(req);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutProgramDto: UpdateWorkoutProgramDto) {
    return this.workoutProgramsService.update(+id, updateWorkoutProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutProgramsService.remove(+id);
  }
}

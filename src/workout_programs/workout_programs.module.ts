import { Module } from '@nestjs/common';
import { WorkoutProgramsService } from './workout_programs.service';
import { WorkoutProgramsController } from './workout_programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutProgram } from './entities/workout_program.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports :[

    TypeOrmModule.forFeature([WorkoutProgram , User])
    
  ],
  controllers: [WorkoutProgramsController],
  providers: [WorkoutProgramsService],
})
export class WorkoutProgramsModule {}

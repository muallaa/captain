import { Module } from '@nestjs/common';
import { WorkoutProgramsService } from './workout_programs.service';
import { WorkoutProgramsController } from './workout_programs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutProgram } from './entities/workout_program.entity';
import { User } from 'src/user/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { ExerciseVideo } from 'src/exercise_videos/entities/exercise_video.entity';
import { SupplementPlan } from 'src/supplement_plans/entities/supplement_plan.entity';
import { NutritionPlan } from 'src/nutrition_plans/entities/nutrition_plan.entity';

@Module({
  imports :[

    TypeOrmModule.forFeature([WorkoutProgram , User , Exercise , ExerciseVideo , SupplementPlan , NutritionPlan])
    
  ],
  controllers: [WorkoutProgramsController],
  providers: [WorkoutProgramsService],
})
export class WorkoutProgramsModule {}

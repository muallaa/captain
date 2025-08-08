import { Injectable } from '@nestjs/common';
import { CreateWorkoutProgramDto } from './dto/create-workout_program.dto';
import { UpdateWorkoutProgramDto } from './dto/update-workout_program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutProgram } from './entities/workout_program.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { ExerciseVideo } from 'src/exercise_videos/entities/exercise_video.entity';
import { NutritionPlan } from 'src/nutrition_plans/entities/nutrition_plan.entity';
import { SupplementPlan } from 'src/supplement_plans/entities/supplement_plan.entity';

@Injectable()
export class WorkoutProgramsService {
  
  constructor(
    @InjectRepository(WorkoutProgram) private workoutProgramRepo : Repository<WorkoutProgram>,
    @InjectRepository(User) private repoUser : Repository<User>,

      @InjectRepository(Exercise)
    private exerciseRepo: Repository<Exercise>,

    @InjectRepository(ExerciseVideo)
    private exerciseVideoRepo: Repository<ExerciseVideo>,

    @InjectRepository(NutritionPlan)
    private NutritionPlanRepo: Repository<NutritionPlan>,

    @InjectRepository(SupplementPlan)
    private SupplementPlanRepo: Repository<SupplementPlan>,

  ){}

  create(createWorkoutProgramDto: CreateWorkoutProgramDto) {
    return 'This action adds a new workoutProgram';
  }

  findAll() {
    return `This action returns all workoutPrograms`;
  }

 async findOne(currentUser : {sub : number , role : string }) {

   


      const program = await this.workoutProgramRepo.find({where : {user_id : currentUser.sub} , relations : ['exercises' , 'exercises.videos' , 'exercises.videos.video']})

      return program
  }

  update(id: number, updateWorkoutProgramDto: UpdateWorkoutProgramDto) {
    return `This action updates a #${id} workoutProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutProgram`;
  }

  async saveWorkoutProgram(data: any) {


    const supplement = this.SupplementPlanRepo.create({
      user_id : data.userId,
      plan_details : data.supplements
    })

    const saveSupplement = this.SupplementPlanRepo.save(supplement)

    const nutrition = this.NutritionPlanRepo.create({
      user_id : data.userId,
      plan_details : data.mealPlan
    })

    const saveNutrition = this.NutritionPlanRepo.save(nutrition)


    for (const day of data.days) {
      const dayMap = {
        'الاحد': 'Sunday',
        'الاثنين': 'Monday',
        'الثلاثاء': 'Tuesday',
        'الاربعاء': 'Wednesday',
        'الخميس': 'Thursday',
        'الجمعة': 'Friday',
        'السبت': 'Saturday',
      };

      const workoutProgram = this.workoutProgramRepo.create({
        user_id: data.userId,
        day_of_week: dayMap[day.name],
      });

      const savedProgram = await this.workoutProgramRepo.save(workoutProgram);

      for (const ex of day.exercises) {
        const exercise = this.exerciseRepo.create({
          program_id: savedProgram.program_id,
          exercise_name: ex.name,
          details: ex.description,
        });

        const savedExercise = await this.exerciseRepo.save(exercise);

        for (const video of ex.videos) {
          const exerciseVideo = this.exerciseVideoRepo.create({
            exercise_id: savedExercise.exercise_id,
            video: video.video_id, // assuming it's a reference to existing video
          });

          await this.exerciseVideoRepo.save(exerciseVideo);
        }
      }
    }

    const userUpdate = this.repoUser.update({user_id : data.userId} , { course_status : 'Active'})

    return { success: true };
  }
}

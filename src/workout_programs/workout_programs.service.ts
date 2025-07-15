import { Injectable } from '@nestjs/common';
import { CreateWorkoutProgramDto } from './dto/create-workout_program.dto';
import { UpdateWorkoutProgramDto } from './dto/update-workout_program.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutProgram } from './entities/workout_program.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkoutProgramsService {
  
  constructor(
    @InjectRepository(WorkoutProgram) private repoWork : Repository<WorkoutProgram>,
    @InjectRepository(User) private repoUser : Repository<User>,

  ){}

  create(createWorkoutProgramDto: CreateWorkoutProgramDto) {
    return 'This action adds a new workoutProgram';
  }

  findAll() {
    return `This action returns all workoutPrograms`;
  }

 async findOne(currentUser : {sub : number , role : string }) {

   


      const program = await this.repoWork.find({where : {user_id : currentUser.sub} , relations : ['exercises' , 'exercises.videos']})

      return program
  }

  update(id: number, updateWorkoutProgramDto: UpdateWorkoutProgramDto) {
    return `This action updates a #${id} workoutProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutProgram`;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNutritionPlanDto } from './dto/create-nutrition_plan.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition_plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NutritionPlan } from './entities/nutrition_plan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NutritionPlansService {

  constructor(
    @InjectRepository(NutritionPlan) private RepoNutrition : Repository<NutritionPlan>,
    @InjectRepository(User) private userRepository : Repository<User>

  ){}


  async create(createNutritionPlanDto: CreateNutritionPlanDto , currentUser : {sub : number; role:string}) {

   
    const { user_id , plan_details } = createNutritionPlanDto

    const user = await this.userRepository.findOne({where : {user_id}})

    if(!user) {
      throw new BadRequestException('User not found')
    }

    const Plan = this.RepoNutrition.create({
      user_id,
      plan_details,
      user
    })

    try{
      return await this.RepoNutrition.save(Plan)
    } catch(error) {
      throw new BadRequestException("Failed to create Nutrition plan")
    }
  }


  async findAll() {
   
    return await this.RepoNutrition.find({relations : ['user']})

  }


  async findOne( currentUser : {sub : number; role : string}) {
    
    const Plan = await this.RepoNutrition.findOne({where :{ user_id : currentUser.sub}})

    if(!Plan){
      throw new BadRequestException("Nutrition plan not found")
    }

    return Plan
  }


  async update(id: number, updateNutritionPlanDto: UpdateNutritionPlanDto , currentUser : {sub : number; role: string}) {
    
    const Plan = await this.RepoNutrition.findOne({where :{ user_id : currentUser.sub} , relations :['user']})

    if(!Plan) {
      throw new BadRequestException('Nutrition plan not found')
    }

    const newPlan: Partial<NutritionPlan> = {}

    if(updateNutritionPlanDto.plan_details) {
      newPlan.plan_details = updateNutritionPlanDto.plan_details
    }

    await this.RepoNutrition.update({ nutrition_id : id} , newPlan)

    return await this.RepoNutrition.findOne({where : { nutrition_id : id} , relations : ['user']})
  }

  async remove(id: number ) {
   
    await this.RepoNutrition.delete({nutrition_id : id})

    return { message  : ' Nutrition plan deleted successfully'}
  }
}

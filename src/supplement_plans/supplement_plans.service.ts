import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateSupplementPlanDto } from './dto/create-supplement_plan.dto';
import { UpdateSupplementPlanDto } from './dto/update-supplement_plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplementPlan } from './entities/supplement_plan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SupplementPlansService {
 constructor(
    @InjectRepository(SupplementPlan)
    private supplementPlanRepository: Repository<SupplementPlan>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createSupplementPlanDto: CreateSupplementPlanDto, currentUser: { sub: number; role: string }): Promise<SupplementPlan> {
    const { user_id, plan_details } = createSupplementPlanDto;

    if (currentUser.role !== 'admin' && currentUser.sub !== user_id) {
      throw new ForbiddenException('You can only create supplement plans for yourself');
    }

    const user = await this.userRepository.findOne({ where: { user_id } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const supplementPlan = this.supplementPlanRepository.create({
      user_id,
      plan_details,
      user,
    });

    try {
      return await this.supplementPlanRepository.save(supplementPlan);
    } catch (error) {
      throw new BadRequestException('Failed to create supplement plan');
    }
  }

  async findAll(currentUser: { sub: number; role: string }): Promise<SupplementPlan[]> {
    if (currentUser.role === 'admin') {
      return await this.supplementPlanRepository.find({ relations: ['user'] });
    }
    return await this.supplementPlanRepository.find({ where: { user_id: currentUser.sub }, relations: ['user'] });
  }

  async findOne( currentUser: { sub: number; role: string }): Promise<SupplementPlan> {
    const supplementPlan = await this.supplementPlanRepository.findOne({ where: { user_id: currentUser.sub }, relations: ['user'] });
    if (!supplementPlan) {
      throw new BadRequestException('Supplement plan not found');
    }
    if (currentUser.role !== 'admin' && currentUser.sub !== supplementPlan.user_id) {
      throw new ForbiddenException('You can only view your own supplement plans');
    }
    return supplementPlan;
  }

  async update(id: number, updateSupplementPlanDto: UpdateSupplementPlanDto, currentUser: { sub: number; role: string }){
    const supplementPlan = await this.supplementPlanRepository.findOne({ where: { supplement_id: id }, relations: ['user'] });
    if (!supplementPlan) {
      throw new BadRequestException('Supplement plan not found');
    }

    if (currentUser.role !== 'admin' && currentUser.sub !== supplementPlan.user_id) {
      throw new ForbiddenException('You can only update your own supplement plans');
    }

    if (updateSupplementPlanDto.user_id && updateSupplementPlanDto.user_id !== supplementPlan.user_id) {
      if (currentUser.role !== 'admin') {
        throw new ForbiddenException('Only admins can change the user_id');
      }
      const newUser = await this.userRepository.findOne({ where: { user_id: updateSupplementPlanDto.user_id } });
      if (!newUser) {
        throw new BadRequestException('New user not found');
      }
      supplementPlan.user_id = updateSupplementPlanDto.user_id;
      supplementPlan.user = newUser;
    }

    const updateData: Partial<SupplementPlan> = {};
    if (updateSupplementPlanDto.plan_details) {
      updateData.plan_details = updateSupplementPlanDto.plan_details;
    }

    await this.supplementPlanRepository.update({ supplement_id: id }, updateData);
    return await this.supplementPlanRepository.findOne({ where: { supplement_id: id }, relations: ['user'] });
  }

  async remove(id: number, currentUser: { sub: number; role: string }): Promise<{ message: string }> {
    const supplementPlan = await this.supplementPlanRepository.findOne({ where: { supplement_id: id }, relations: ['user'] });
    if (!supplementPlan) {
      throw new BadRequestException('Supplement plan not found');
    }

    if (currentUser.role !== 'admin' && currentUser.sub !== supplementPlan.user_id) {
      throw new ForbiddenException('You can only delete your own supplement plans');
    }

    await this.supplementPlanRepository.delete({ supplement_id: id });
    return { message: 'Supplement plan deleted successfully' };
  }
}

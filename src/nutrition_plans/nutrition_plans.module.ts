import { Module } from '@nestjs/common';
import { NutritionPlansService } from './nutrition_plans.service';
import { NutritionPlansController } from './nutrition_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionPlan } from './entities/nutrition_plan.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NutritionPlan , User])
  ],
  controllers: [NutritionPlansController],
  providers: [NutritionPlansService],
})
export class NutritionPlansModule {}

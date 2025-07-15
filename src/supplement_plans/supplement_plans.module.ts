import { Module } from '@nestjs/common';
import { SupplementPlansService } from './supplement_plans.service';
import { SupplementPlansController } from './supplement_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplementPlan } from './entities/supplement_plan.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([SupplementPlan , User])
  ],
  controllers: [SupplementPlansController],
  providers: [SupplementPlansService],
})
export class SupplementPlansModule {}

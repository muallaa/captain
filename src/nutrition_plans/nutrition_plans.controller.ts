import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, SetMetadata } from '@nestjs/common';
import { NutritionPlansService } from './nutrition_plans.service';
import { CreateNutritionPlanDto } from './dto/create-nutrition_plan.dto';
import { UpdateNutritionPlanDto } from './dto/update-nutrition_plan.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CourseStatusGuard } from 'src/guard/course-status.guard';

@Controller('nutrition-plans')
export class NutritionPlansController {
  constructor(private readonly nutritionPlansService: NutritionPlansService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNutritionPlanDto: CreateNutritionPlanDto , @Request() req: any) {
    return this.nutritionPlansService.create(createNutritionPlanDto , req.user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.nutritionPlansService.findAll();
  }

  @Get('')
  @UseGuards(JwtAuthGuard , CourseStatusGuard)
  @SetMetadata('course_statuses' , ['Active'])
  findOne(@Request() req: any) {
    return this.nutritionPlansService.findOne(req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateNutritionPlanDto: UpdateNutritionPlanDto , @Request() req:any) {
    return this.nutritionPlansService.update(+id, updateNutritionPlanDto , req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionPlansService.remove(+id);
  }
}

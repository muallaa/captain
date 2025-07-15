import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Request, ParseIntPipe, SetMetadata } from '@nestjs/common';
import { SupplementPlansService } from './supplement_plans.service';
import { CreateSupplementPlanDto } from './dto/create-supplement_plan.dto';
import { UpdateSupplementPlanDto } from './dto/update-supplement_plan.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CourseStatusGuard } from 'src/guard/course-status.guard';

@Controller('supplement-plans')
export class SupplementPlansController {
  constructor(private readonly supplementPlansService: SupplementPlansService) {}

 @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSupplementPlanDto: CreateSupplementPlanDto, @Request() req: any) {
    return this.supplementPlansService.create(createSupplementPlanDto, req.user);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.supplementPlansService.findAll(req.user);
  }

  @Get('')
  @UseGuards(JwtAuthGuard , CourseStatusGuard)
  @SetMetadata('course_statuses', ['Active'])
  findOne( @Request() req: any) {
    return this.supplementPlansService.findOne(req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplementPlanDto: UpdateSupplementPlanDto, @Request() req: any) {
    return this.supplementPlansService.update(id, updateSupplementPlanDto, req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.supplementPlansService.remove(id, req.user);
  }
}

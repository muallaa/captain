import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionPackagesService } from './subscription_packages.service';
import { CreateSubscriptionPackageDto } from './dto/create-subscription_package.dto';
import { UpdateSubscriptionPackageDto } from './dto/update-subscription_package.dto';

@Controller('subscription-packages')
export class SubscriptionPackagesController {
  constructor(private readonly subscriptionPackagesService: SubscriptionPackagesService) {}

  @Post()
  create(@Body() createSubscriptionPackageDto: CreateSubscriptionPackageDto) {
    return this.subscriptionPackagesService.create(createSubscriptionPackageDto);
  }

  @Get()
  findAll() {
    return this.subscriptionPackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionPackagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionPackageDto: UpdateSubscriptionPackageDto) {
    return this.subscriptionPackagesService.update(+id, updateSubscriptionPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionPackagesService.remove(+id);
  }
}

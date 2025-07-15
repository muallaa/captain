import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPackageDto } from './dto/create-subscription_package.dto';
import { UpdateSubscriptionPackageDto } from './dto/update-subscription_package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPackage } from './entities/subscription_package.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionPackagesService {

  constructor(
    @InjectRepository(SubscriptionPackage) private RepoSubscrib : Repository<SubscriptionPackage>
  ){}

  create(createSubscriptionPackageDto: CreateSubscriptionPackageDto) {
    return 'This action adds a new subscriptionPackage';
  }

  async findAll() {
   
    const all_Packages =await  this.RepoSubscrib.find()

    if(!all_Packages.length){
      throw new NotFoundException('not exist Packages yet')
    }

    return all_Packages
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionPackage`;
  }

  update(id: number, updateSubscriptionPackageDto: UpdateSubscriptionPackageDto) {
    return `This action updates a #${id} subscriptionPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionPackage`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionPackageDto } from './dto/create-subscription_package.dto';
import { UpdateSubscriptionPackageDto } from './dto/update-subscription_package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionPackage } from './entities/subscription_package.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class SubscriptionPackagesService {

  constructor(
    @InjectRepository(SubscriptionPackage) private RepoSubscrib : Repository<SubscriptionPackage>,
     @InjectRepository(User)
  private userRepo: Repository<User>,
  ){}

  async create(createSubscriptionPackageDto: CreateSubscriptionPackageDto , file ) {
   
  
    createSubscriptionPackageDto.image = file.path

    const create = await this.RepoSubscrib.create(createSubscriptionPackageDto)

    this.RepoSubscrib.save(create)

    return create
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

async update(id: number, updateSubscriptionPackageDto: UpdateSubscriptionPackageDto, file?: Express.Multer.File) {
  const existing = await this.RepoSubscrib.findOneBy({ package_id : id });

  if (!existing) {
    throw new NotFoundException('الباقة غير موجودة');
  }

  if (file) {
    updateSubscriptionPackageDto.image = `uploads/${file.filename}`;
  }

  const updated = Object.assign(existing, updateSubscriptionPackageDto);
  return this.RepoSubscrib.save(updated);
}


 async remove(id: number) {
  const existing = await this.RepoSubscrib.findOne({
    where: { package_id: id },
    relations: ['userSubscriptions', 'userSubscriptions.user'],
  });

  if (!existing) {
    throw new NotFoundException('الباقة غير موجودة');
  }

  // ✅ تحديث المستخدمين
  const usersToUpdate = existing.userSubscriptions.map((sub) => sub.user);
  for (const user of usersToUpdate) {
    user.course_status = 'MustSubscribe';
    await this.userRepo.save(user);
  }

  // ✅ حذف الباقة
  await this.RepoSubscrib.delete({ package_id: id });

  return { message: 'تم حذف الباقة وتحديث حالة المستخدمين' };
}

}

import { Module } from '@nestjs/common';
import { SubscriptionPackagesService } from './subscription_packages.service';
import { SubscriptionPackagesController } from './subscription_packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPackage } from './entities/subscription_package.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([SubscriptionPackage , User])
  ],
  controllers: [SubscriptionPackagesController],
  providers: [SubscriptionPackagesService],
})
export class SubscriptionPackagesModule {}

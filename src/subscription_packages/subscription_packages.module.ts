import { Module } from '@nestjs/common';
import { SubscriptionPackagesService } from './subscription_packages.service';
import { SubscriptionPackagesController } from './subscription_packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPackage } from './entities/subscription_package.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([SubscriptionPackage])
  ],
  controllers: [SubscriptionPackagesController],
  providers: [SubscriptionPackagesService],
})
export class SubscriptionPackagesModule {}

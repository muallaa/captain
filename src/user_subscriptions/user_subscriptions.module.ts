import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './user_subscriptions.service';
import { UserSubscriptionsController } from './user_subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscription } from './entities/user_subscription.entity';
import { User } from 'src/user/entities/user.entity';
import { SubscriptionPackage } from 'src/subscription_packages/entities/subscription_package.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserSubscription , User , SubscriptionPackage])
  ],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
})
export class UserSubscriptionsModule {}

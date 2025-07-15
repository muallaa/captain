import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserSubscriptionDto } from './dto/create-user_subscription.dto';
import { UpdateUserSubscriptionDto } from './dto/update-user_subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSubscription } from './entities/user_subscription.entity';
import { In, MoreThan, Or, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { SubscriptionPackage } from 'src/subscription_packages/entities/subscription_package.entity';

@Injectable()
export class UserSubscriptionsService {
  constructor(
    @InjectRepository(UserSubscription)
    private userSubscriptionRepository: Repository<UserSubscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SubscriptionPackage)
    private subscriptionPackageRepository: Repository<SubscriptionPackage>,
  ) {}

async create(
    createUserSubscriptionDto: CreateUserSubscriptionDto,
    currentUser: { sub: number; role: string },
    paymentProofPath?: string,
  ): Promise<UserSubscription> {
    const {  package_id, status, start_date } = createUserSubscriptionDto;

    


    // Validate user_id
    const user = await this.userRepository.findOne({ where: { user_id : currentUser.sub } });
    if (!user) {
      throw new BadRequestException('Invalid user_id');
    }

    // Validate package_id and fetch duration_days
    const subscriptionPackage = await this.subscriptionPackageRepository.findOne({ where: { package_id } });
    if (!subscriptionPackage) {
      throw new BadRequestException('Invalid package_id');
    }


     // Check for active subscription
    const currentDate = new Date();
    const existingSubscription = await this.userSubscriptionRepository.findOne({
      where: {
        user_id: currentUser.sub,
        package_id,
        status: In(['Approved', 'Pending']),
        end_date: MoreThan(currentDate) , // TypeORM syntax for end_date > currentDate
      },
    });
    if (existingSubscription) {
      throw new BadRequestException('User already has an active subscription for this package');
    }
    // Set start_date (default to current date if not provided)
    const startDate = start_date ? new Date(start_date) : new Date();
    if (start_date && isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid start_date format');
    }

    // Calculate end_date based on duration_days
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + subscriptionPackage.duration_days);

    // Create subscription
    const subscription = this.userSubscriptionRepository.create({
      user_id : currentUser.sub,
      package_id,
      payment_proof: paymentProofPath,
      status: status || 'Pending',
      start_date: startDate,
      end_date: endDate,
    });

    try {
      return await this.userSubscriptionRepository.save(subscription);
    } catch (error) {
      throw new BadRequestException('Failed to create subscription');
    }
  }


  findAll() {
    return `This action returns all userSubscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userSubscription`;
  }

  update(id: number, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    return `This action updates a #${id} userSubscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} userSubscription`;
  }
}

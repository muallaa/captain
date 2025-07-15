import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('subscription_packages')
export class SubscriptionPackage {
  @PrimaryGeneratedColumn()
  package_id: number;

  @Column({ type: 'varchar', length: 255 })
  package_name: string;

  @Column({ type: 'int' })
  duration_days: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  
  @OneToMany(() => UserSubscription, (userSubscription) => userSubscription.subscription_package)
  userSubscriptions: UserSubscription[];
}
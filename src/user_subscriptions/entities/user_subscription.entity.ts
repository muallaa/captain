import { SubscriptionPackage } from 'src/subscription_packages/entities/subscription_package.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_subscriptions')
export class UserSubscription {
  @PrimaryGeneratedColumn()
  subscription_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  package_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  payment_proof?: string;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Approved', 'Rejected', 'Expired'],
    default: 'Pending',
  })
  status: 'Pending' | 'Approved' | 'Rejected' | 'Expired';

  @Column({ type: 'date', nullable: true })
  start_date?: Date;

  @Column({ type: 'date', nullable: true })
  end_date?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => SubscriptionPackage, (subscriptionPackage) => subscriptionPackage.userSubscriptions , { onDelete : 'CASCADE'})
  @JoinColumn({ name: 'package_id' })
  subscription_package: SubscriptionPackage;
}
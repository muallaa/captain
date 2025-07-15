import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('nutrition_plans')
export class NutritionPlan {
  @PrimaryGeneratedColumn()
  nutrition_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'text' })
  plan_details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.nutrition_plans)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
import { NutritionPlan } from 'src/nutrition_plans/entities/nutrition_plan.entity';
import { PasswordResetCode } from 'src/password_reset_codes/entities/password_reset_code.entity';
import { SupplementPlan } from 'src/supplement_plans/entities/supplement_plan.entity';
import { UserBodyPicture } from 'src/user_body_pictures/entities/user_body_picture.entity';
import { UserSubscription } from 'src/user_subscriptions/entities/user_subscription.entity';
import { WorkoutProgram } from 'src/workout_programs/entities/workout_program.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profile_picture?: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height?: number;

  @Column({ type: 'int', nullable: true })
  age?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gym_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region?: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sleep_hours?: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  work_hours?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  training_experience?: string;

  @Column({ type: 'enum', enum: ['Low', 'Medium', 'High'], nullable: true })
  work_effort?: 'Low' | 'Medium' | 'High';

  @Column({
    type: 'enum',
    enum: ['WeightGain', 'WeightLoss', 'FatBurnMuscleBuild', 'ChampionshipPrep'],
    nullable: true,
  })
  training_goal?: 'WeightGain' | 'WeightLoss' | 'FatBurnMuscleBuild' | 'ChampionshipPrep';

  @Column({ type: 'enum', enum: ['No', 'Yes', 'CoachDecision'], nullable: true })
  hormone_use?: 'No' | 'Yes' | 'CoachDecision';

  @Column({ type: 'text', nullable: true })
  injuries?: string;

  @Column({ type: 'text', nullable: true })
  unwanted_meal?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({
    type: 'enum',
    enum: ['MustSubscribe', 'Pending', 'Active'],
    default: 'MustSubscribe',
  })
  course_status: 'MustSubscribe' | 'Pending' | 'Active';

  
  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';


  @OneToMany(() => UserBodyPicture, (userBodyPicture) => userBodyPicture.user)
  body_pictures: UserBodyPicture[];


  @OneToMany(() => PasswordResetCode, (passwordResetCode) => passwordResetCode.user)
  password_reset_codes: PasswordResetCode[];

  @OneToMany(() => SupplementPlan, (supplementPlan) => supplementPlan.user)
  supplement_plans: SupplementPlan[];


  @OneToMany(() => UserSubscription, (userSubscription) => userSubscription.user)
  subscriptions: UserSubscription[];

  @OneToMany(() => WorkoutProgram, (workoutProgram) => workoutProgram.user)
  workout_programs: WorkoutProgram[];

  @OneToMany(() => NutritionPlan, (nutritionPlan) => nutritionPlan.user)
  nutrition_plans: NutritionPlan[];

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
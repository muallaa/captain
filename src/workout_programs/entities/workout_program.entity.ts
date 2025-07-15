import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('workout_programs')
export class WorkoutProgram {
  @PrimaryGeneratedColumn()
  program_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({
    type: 'enum',
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  })
  day_of_week: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.workout_programs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Exercise, (exercise) => exercise.workoutProgram)
  exercises: Exercise[];
}
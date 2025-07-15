import { ExerciseVideo } from 'src/exercise_videos/entities/exercise_video.entity';
import { WorkoutProgram } from 'src/workout_programs/entities/workout_program.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column({ type: 'int' })
  program_id: number;

  @Column({ type: 'varchar', length: 255 })
  exercise_name: string;

  @Column({ type: 'text' })
  details: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => WorkoutProgram, (workoutProgram) => workoutProgram.exercises)
  @JoinColumn({ name: 'program_id' })
  workoutProgram: WorkoutProgram;

  @OneToMany(() => ExerciseVideo, (exerciseVideo) => exerciseVideo.exercise)
  videos: ExerciseVideo[];

}
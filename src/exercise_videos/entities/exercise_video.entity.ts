import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('exercise_videos')
export class ExerciseVideo {
  @PrimaryGeneratedColumn()
  video_id: number;

  @Column({ type: 'int' })
  exercise_id: number;

  @Column({ type: 'varchar', length: 255 })
  video_url: string;

  @CreateDateColumn()
  created_at: Date;

  
  @ManyToOne(() => Exercise, (exercise) => exercise.videos)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

}
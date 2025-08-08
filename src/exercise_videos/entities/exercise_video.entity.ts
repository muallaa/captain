import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Video } from 'src/videos/entities/video.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('exercise_videos')
export class ExerciseVideo {
  @PrimaryGeneratedColumn()
  video_id: number;

  @Column({ type: 'int' })
  exercise_id: number;



  @CreateDateColumn()
  created_at: Date;

  
  @ManyToOne(() => Exercise, (exercise) => exercise.videos)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ManyToOne(() => Video , (video) => video.exerciseVideos)
  @JoinColumn({ name: 'videoID' })
  video : Video

}
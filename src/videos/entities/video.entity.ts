import { ExerciseVideo } from "src/exercise_videos/entities/exercise_video.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('videos')
export class Video {

    @PrimaryGeneratedColumn()
    video_id : number;

    @Column()
    title : string;

    @Column()
    video_url : string;

    @Column()
    type : string;


     @CreateDateColumn()
      created_at: Date;
    
      @UpdateDateColumn()
      updated_at: Date;

      @OneToMany(() => ExerciseVideo, (exerciseVideo) => exerciseVideo.video)
  exerciseVideos: ExerciseVideo[];

    
}

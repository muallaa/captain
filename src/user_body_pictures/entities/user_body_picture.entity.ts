import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('user_body_pictures')
export class UserBodyPicture {
  @PrimaryGeneratedColumn()
  picture_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  picture_url: string;

  @ManyToOne(() => User, (user) => user.body_pictures)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  uploaded_at: Date;
}
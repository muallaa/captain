import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('coach_communications')
export class CoachCommunication {
  @PrimaryGeneratedColumn()
  communication_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name : string

  @Column({ type: 'varchar', length: 255, nullable: true })
  email : string

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 250 })
  barcode_img: string;
}
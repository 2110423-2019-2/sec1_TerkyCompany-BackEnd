import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  workshop_id: number;

  @Column()
  workshop_name: string;

  @Column()
  organization_name: string;

  @Column()
  instructor_name: string;

  @Column()
  location: string;
}

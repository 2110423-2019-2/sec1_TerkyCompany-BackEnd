import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Workshop {
  //! without attributes ( Tags(WorkshopID, Tag) )

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  capacity: number;

  @Column()
  cost: number;

  @Column()
  name: string;

  @Column()
  place: string;

  @Column()
  deadlineTime: Date;

  @Column()
  publishTime: Date;

  @Column()
  description: string;

  @Column()
  speakerName: string;

  @Column()
  pictureURL: string;

  @Column()
  tag: string;
}

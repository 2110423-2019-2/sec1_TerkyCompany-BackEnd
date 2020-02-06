import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class Workshop {
  //! without attributes ( Tags(WorkshopID, Tag) )

  @PrimaryGeneratedColumn()
  WorkshopID: string;

  @Column()
  StartTime: Timestamp;

  @Column()
  EndTime: Timestamp;

  @Column()
  Capacity: number;

  @Column()
  Cost: number;

  @Column()
  Name: string;

  @Column()
  Place: string;

  @Column()
  DeadlineTime: Timestamp;

  @Column()
  PublishTime: Timestamp;

  @Column()
  Description: string;

  @Column()
  SpeakerName: string;

  @Column()
  PictureURL: string;
}

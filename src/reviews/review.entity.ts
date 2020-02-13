import { Entity, Column, PrimaryColumn, Timestamp } from 'typeorm';

@Entity()
export class ReviewEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  rating: number;

  // ! It should be Datetime
  @Column({ nullable: true })
  timeWritten: Timestamp;

  @Column({ nullable: true })
  comment: string;

  // ! Total many to one (MemberT username)
  // ! Total many to one (Workshop id)
}

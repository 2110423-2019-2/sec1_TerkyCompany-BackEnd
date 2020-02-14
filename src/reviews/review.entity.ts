import { Entity, Column, PrimaryColumn, Timestamp, ManyToOne } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { WorkshopsService } from 'src/workshops/workshops.service';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class ReviewEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  rating: number;

  // ! It should be Datetime
  @Column({ nullable: false })
  timeWritten: Timestamp;

  // We can only rate but no comment.
  @Column({ nullable: true })
  comment: string;

  // ? How to do total participation ( my own handling ? )
  // ! Total many to one (MemberT username)
  // ! Total many to one (Workshop id)
  @ManyToOne(
    type => Workshop,
    workshop => workshop.review,
  )
  workshop: Workshop;

  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.review,
  )
  memberT: MemberTEntity;
}

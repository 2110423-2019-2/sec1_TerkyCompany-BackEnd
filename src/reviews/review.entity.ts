import {
  Entity,
  Column,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { WorkshopsService } from 'src/workshops/workshops.service';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class ReviewEntity {
  @PrimaryColumn('varchar', { length: 20 })
  id: string;

  @Column('decimal', { precision: 2, scale: 1, nullable: false })
  rating: number;

  @Column('datetime', { nullable: false })
  timeWritten: Date;

  @Column('text', { nullable: false })
  comment: string;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => Workshop,
    workshop => workshop.reviews,
  )
  workshop: Workshop;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.reviews,
  )
  memberT: MemberTEntity;
}

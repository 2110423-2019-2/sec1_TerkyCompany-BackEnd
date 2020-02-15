import {
  Entity,
  Column,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class BookEntity {
  // ! Workshop.id & MemberT.username is the primary key
  @PrimaryGeneratedColumn()
  uniqueID: number;

  @ManyToOne(
    type => Workshop,
    workshop => workshop.books,
  )
  workshop: Workshop;

  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.books,
  )
  memberT: MemberTEntity;

  @Column('timestamp', { nullable: true })
  timeBooked: Timestamp;

  @Column('boolean', { nullable: true })
  hasParticipated: boolean;

  @Column('varchar', { nullable: true })
  transactionDetail: string;
}

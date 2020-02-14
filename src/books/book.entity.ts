import {
  Entity,
  Column,
  PrimaryColumn,
  Timestamp,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class BookEntity {
  // ! Workshop.id & MemberT.username is the primary key
  @PrimaryColumn()
  @ManyToOne(
    type => Workshop,
    workshop => workshop.books,
  )
  workshop: Workshop;

  @PrimaryColumn()
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.books,
  )
  memberT: MemberTEntity;

  @Column({ nullable: true })
  timeBooked: Timestamp;

  @Column({ nullable: true })
  hasParticipated: boolean;

  @Column({ nullable: true })
  transactionDetail: string;
}

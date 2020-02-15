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
  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => Workshop,
    workshop => workshop.books,
  )
  workshop: Workshop;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.books,
  )
  memberT: MemberTEntity;

  @Column('timestamp', { nullable: true })
  timeBooked: Timestamp;

  @Column('boolean', { nullable: true })
  hasParticipated: boolean;

  @Column('varchar', { length: 256, nullable: true })
  transactionDetail: string;
}

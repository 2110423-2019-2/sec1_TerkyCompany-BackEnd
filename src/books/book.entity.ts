import {
  Entity,
  Column,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

@Entity()
export class BookEntity {
  @PrimaryColumn('varchar', { length: 36 })
  @ManyToOne(
    type => Workshop,
    workshop => workshop.books,
	{ cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinTable()
  workshop: Workshop;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.books,
	{ cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  memberT: MemberTEntity;

  @Column('timestamp', { nullable: true, default: () => "CURRENT_TIMESTAMP"})
  timeBooked: Timestamp;

  @Column('boolean', { nullable: true })
  hasParticipated: boolean;

  @Column('varchar', { length: 256, nullable: true })
  transactionDetail: string;

  @Column('varchar', { length: 100 })
  ticketURL: string;


}

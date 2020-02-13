import { Entity, Column, PrimaryColumn, Timestamp, ManyToMany } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class BookEntity {
  // ! Workshop.id & MemberT.username is the primary key
  @ManyToMany(type => Workshop)
  workshop: Workshop;

  @ManyToMany(type => MemberTEntity)
  memberT: MemberTEntity;

  @Column({ nullable: true })
  timeBooked: Timestamp;

  @Column({ nullable: true })
  hasParticipated: boolean;

  @Column({ nullable: true })
  transactionDetail: string;
}

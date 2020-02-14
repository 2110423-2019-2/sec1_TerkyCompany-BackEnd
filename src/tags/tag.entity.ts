import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class TagEntity {
  @PrimaryColumn()
  @ManyToOne(
    type => Workshop,
    workshop => workshop.tags,
  )
  workshop: Workshop;

  @PrimaryColumn()
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.tags,
  )
  memberT: MemberTEntity;

  @Column()
  tag: string;
}

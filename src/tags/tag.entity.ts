import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class TagEntity {
  @PrimaryColumn('varchar')
  @ManyToOne(
    type => Workshop,
    workshop => workshop.tags,
  )
  workshop: Workshop;

  @PrimaryColumn('varchar')
  tag: string;
}

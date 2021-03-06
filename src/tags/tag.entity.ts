import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Workshop } from '../workshops/workshop.entity';
import { MemberTEntity } from '../members-t/member-t.entity';

@Entity()
export class TagEntity {
  @PrimaryColumn('varchar', { length: 36 })
  @ManyToOne(
    type => Workshop,
    workshop => workshop.tags,
	{
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	}
  )
  workshop: Workshop;

  @PrimaryColumn('varchar', { length: 30 })
  tag: string;
}

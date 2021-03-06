import {
  Entity,
  Column,
  PrimaryColumn,
  Timestamp,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workshop } from '../workshops/workshop.entity';
import { WorkshopsService } from '../workshops/workshops.service';
import { MemberTEntity } from '../members-t/member-t.entity';

@Entity()
export class ReviewEntity {

  @Column('decimal', { precision: 2, scale: 1, nullable: false })
  rating: number;

  @Column('datetime', { nullable: false, default: () => "CURRENT_TIMESTAMP"}) // Still need to change into UTC +7
  timeWritten: Date;

  @Column('text', { nullable: false })
  comment: string;

  @PrimaryColumn('varchar', { length: 36 })
  @ManyToOne(
    type => Workshop,
    workshop => workshop.reviews,
	{
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	}
  )
  workshop: Workshop;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.reviews,
	{
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	}
  )
  memberT: MemberTEntity;
}

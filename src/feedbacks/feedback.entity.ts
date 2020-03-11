import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class FeedbackEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('text', { nullable: false })
  comment: string;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.reviews,
	{ cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  memberT: MemberTEntity;
}

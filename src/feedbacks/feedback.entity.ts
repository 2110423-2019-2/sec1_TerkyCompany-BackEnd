import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class FeedbackEntity {
  @PrimaryColumn('varchar', { length: 20 })
  id: string;

  @Column('text', { nullable: false })
  comment: string;

  @PrimaryColumn('varchar', { length: 20 })	
  @OneToOne(type => MemberTEntity, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  memberT: MemberTEntity;
}

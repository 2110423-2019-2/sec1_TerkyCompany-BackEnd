import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class FeedbackEntity {
  @PrimaryColumn('varchar', { length: 20 })
  id: string;

  @Column('text', { nullable: false })
  comment: string;

  @OneToOne(type => MemberTEntity)
  memberT: MemberTEntity;
}

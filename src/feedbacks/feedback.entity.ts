import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class FeedbackEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  comment: string;

  @OneToOne(type => MemberTEntity)
  memberT: MemberTEntity;
}

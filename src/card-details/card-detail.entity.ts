import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class CardDetailEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  expireDate: Date;

  @OneToOne(type => MemberTEntity)
  cardDetail: CardDetailEntity;
}

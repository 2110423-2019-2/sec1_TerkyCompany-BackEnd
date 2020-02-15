import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Entity()
export class CardDetailEntity {
  @PrimaryColumn('varchar', { length: 16 })
  id: string;

  @Column('date', { nullable: false })
  expireDate: Date;

  @OneToOne(type => MemberTEntity)
  @JoinColumn()
  cardDetail: CardDetailEntity;
}

import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { MemberTEntity } from '../members-t/member-t.entity';

@Entity()
export class CardDetailEntity {
  @PrimaryColumn('varchar', { length: 16 })
  id: string;

  @PrimaryColumn('varchar', { length: 20 })	
  @OneToOne(type => MemberTEntity, { cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }) // PON: ON DELETE CASCADE ON UPDATE CASCADE
  @JoinColumn()
  memberT: MemberTEntity;

  @Column('date', { nullable: false })
  expireDate: Date;
}

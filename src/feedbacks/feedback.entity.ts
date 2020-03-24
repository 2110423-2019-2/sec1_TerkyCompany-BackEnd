import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MemberTEntity } from 'src/members-t/member-t.entity';

export enum Subject {
	Website = "website",
	Payment = "payment",
	Member = "member",
	Workshop = "workshop",
	Other = "other"
}

@Entity()
export class FeedbackEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('enum', { enum: Subject, nullable: false })
  subject: string;

  @Column('text', { nullable: false })
  description: string;

  @PrimaryColumn('varchar', { length: 20 })
  @ManyToOne(
    type => MemberTEntity,
    memberT => memberT.reviews,
	{ cascade: true, onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  memberT: MemberTEntity;
}

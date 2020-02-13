import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class MemberTEntity {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: true })
  password: string;
}

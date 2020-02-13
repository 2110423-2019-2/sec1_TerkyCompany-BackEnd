import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class MemberTEntity {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  isSuspended: boolean;

  @Column({ nullable: true })
  participationFlag: boolean;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: true })
  ownerFlag: boolean;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: true })
  nationalID: string;
}

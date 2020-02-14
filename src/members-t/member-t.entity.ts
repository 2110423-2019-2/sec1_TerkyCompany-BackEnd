import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TagEntity } from 'src/tags/tag.entity';
import { ReviewEntity } from 'src/reviews/review.entity';

@Entity()
export class MemberTEntity {
  @PrimaryColumn()
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  dateOfBirth: Date;

  @Column({ nullable: false })
  fullname: string;

  // ? Not sure about Type of gender
  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: false })
  isSuspended: boolean;

  @Column({ nullable: false })
  participationFlag: boolean;

  @Column({ nullable: true })
  university: string;

  @Column({ nullable: false })
  ownerFlag: boolean;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: false })
  nationalID: string;

  @OneToMany(
    type => TagEntity,
    tag => tag.memberT,
  )
  tag: TagEntity[];

  @OneToMany(
    type => ReviewEntity,
    review => review.memberT,
  )
  review: ReviewEntity[];
}

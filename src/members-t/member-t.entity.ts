import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ReviewEntity } from '../reviews/review.entity';
import { BookEntity } from '../books/book.entity';
import { Workshop } from '../workshops/workshop.entity';

export enum Gender {
	Male = "male",
	Female = "female",
}

export enum UserType {
	Participant = "participant",
  Owner = "owner",
  Admin = "admin"
}

@Entity()
export class MemberTEntity {
  @PrimaryColumn('varchar', { length: 20 })
  username: string;

  @Column('varchar', { length: 150, nullable: false }) // Now is hashed!
  password: string;

  @Column('varchar', { length: 30, nullable: false })
  email: string;

  // ! WARNING: I hack dateOfBirth to be string
  @Column('date', { nullable: false })
  dateOfBirth: Date;

  @Column('varchar', { length: 40, nullable: false })
  fullname: string;

  // ? Not sure about Type of gender
  @Column('enum', { enum: Gender, nullable: false})
  gender: string;

  @Column('boolean', { default: false, nullable: false })
  isSuspended: boolean;

  @Column('enum', { enum: UserType, nullable: false })
  userType: string;

  @Column('varchar', { length: 40 })
  organization: string;

  @Column('varchar', { length: 13, nullable: false })
  nationalID: string;

  // @Column('varchar', { length: 100 })
  // profileURL: string;

  @Column('boolean', { default: false, nullable: false })
  isBanned: boolean;

  @OneToMany(
    type => ReviewEntity,
    reviews => reviews.memberT,
  )
  reviews: ReviewEntity[];

  @OneToMany(
    type => BookEntity,
    books => books.memberT,
  )
  books: BookEntity[];
  
  @OneToMany(
    type => Workshop,
    workshops => workshops.owner,
  )
  workshops: Workshop[];

}

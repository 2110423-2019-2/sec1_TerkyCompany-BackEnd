import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookEntity } from 'src/books/book.entity';

@Entity()
export class MemberTEntity {
  @PrimaryColumn('varchar', { length: 20 })
  username: string;

  @Column('varchar', { length: 20, nullable: false })
  password: string;

  @Column('varchar', { length: 30, nullable: false })
  email: string;

  // ! WARNING: I hack dateOfBirth to be string
  @Column('varchar', { length: 10, nullable: false })
  dateOfBirth: string;

  @Column('varchar', { length: 40, nullable: false })
  fullname: string;

  // ? Not sure about Type of gender
  @Column('varchar', { length: 1, nullable: false })
  gender: string;

  @Column('boolean', { default: false, nullable: false })
  isSuspended: boolean;

  @Column('boolean', { nullable: false })
  participationFlag: boolean;

  @Column('varchar', { length: 40 })
  university: string;

  @Column('boolean', { nullable: false })
  ownerFlag: boolean;

  @Column('varchar', { length: 40 })
  organization: string;

  @Column('varchar', { length: 13, nullable: false })
  nationalID: string;

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
}

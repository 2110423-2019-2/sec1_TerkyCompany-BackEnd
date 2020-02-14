import { Entity, Column, PrimaryColumn, OneToMany, OneToOne } from 'typeorm';
import { TagEntity } from 'src/tags/tag.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookEntity } from 'src/books/book.entity';

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
    tags => tags.memberT,
  )
  tags: TagEntity[];

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

import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { TagEntity } from 'src/tags/tag.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookEntity } from 'src/books/book.entity';

@Entity()
export class Workshop {
  @PrimaryColumn('varchar')
  id: string;

  @Column('date')
  startTime: Date;

  @Column('date')
  endTime: Date;

  @Column('int')
  capacity: number;

  @Column('int')
  cost: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  place: string;

  @Column('date')
  deadlineTime: Date;

  @Column('date')
  publishTime: Date;

  @Column('varchar')
  description: string;

  @Column('varchar')
  speakerName: string;

  @Column('varchar')
  pictureURL: string;

  @OneToMany(
    type => TagEntity,
    tags => tags.workshop,
  )
  tags: TagEntity[];

  @OneToMany(
    type => ReviewEntity,
    reviews => reviews.workshop,
  )
  reviews: ReviewEntity[];

  @OneToMany(
    type => BookEntity,
    books => books.workshop,
  )
  books: BookEntity[];
}

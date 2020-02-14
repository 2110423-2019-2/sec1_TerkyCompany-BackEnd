import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TagEntity } from 'src/tags/tag.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { ReviewsService } from 'src/reviews/reviews.service';
import { BookEntity } from 'src/books/book.entity';

@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  capacity: number;

  @Column()
  cost: number;

  @Column()
  name: string;

  @Column()
  place: string;

  @Column()
  deadlineTime: Date;

  @Column()
  publishTime: Date;

  @Column()
  description: string;

  @Column()
  speakerName: string;

  @Column()
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

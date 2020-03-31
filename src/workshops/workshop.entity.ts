
import { Entity, Column, OneToMany, PrimaryColumn, Timestamp, Check, PrimaryGeneratedColumn, RelationCount, ManyToOne } from 'typeorm';

import { TagEntity } from 'src/tags/tag.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookEntity } from 'src/books/book.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';
import { cloneWithoutLoc } from '@babel/types';

@Entity()
export class Workshop {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column('datetime')
  startTime: Timestamp;

  @Column('datetime')
  endTime: Timestamp;

  @Column('int', { nullable: false })
  capacity: number;

  @Column('decimal', { precision: 7, scale: 2, nullable: false })
  cost: number;

  @Column('varchar', { length: 40, nullable: false })
  name: string;

  @Column('varchar', { length: 40, nullable: false })
  place: string;

  @Column('timestamp', { nullable: false })
  deadlineTime: Timestamp;

  @Column('timestamp', { nullable: false, default: () => "NOW()" }) // Still have to +7 hours to get UTC+7 time but no idea how to do
  publishTime: Timestamp;

  @Column('varchar')
  description: string;

  @Column('varchar', { length: 40 })
  speakerName: string;

  @Column('varchar', { length: 512 })
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

  @Column('varchar', { length: 20, nullable: false } ) // Nullable should be false?
  @ManyToOne(
    type => MemberTEntity, 
    owner => owner.workshops,{
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  )
  owner: MemberTEntity;

  @Column()
  @RelationCount("books")  
  reservedSeat: number;

}

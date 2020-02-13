import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class FeedbackEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  comment: string;
}

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class CardDetailEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  expireDate: Date;

  // weak relation from memberTEntity
}

import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';

@Entity()
export class TagEntity {
  @ManyToOne(type => Workshop)
  workshop: Workshop;

  @Column()
  tag: string;
}

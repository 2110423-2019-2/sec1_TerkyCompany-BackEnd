import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class feedback {

    @PrimaryGeneratedColumn()
    feedbackid:string;

    @Column()
    comment:string;

    @Column()
    username:string;

}
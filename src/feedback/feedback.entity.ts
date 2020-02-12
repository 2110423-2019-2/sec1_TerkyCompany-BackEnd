import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class feedback {

    @PrimaryColumn()
    feedbackid:string;

    @Column()
    comment:string;

    @Column()
    username:string;

}
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Books {

    @PrimaryColumn()
    username: string;

    @PrimaryColumn()
    workshopid:string;

    @Column()
    timebooked:Date;

    @Column() 
    hasparticipated:string;

    @Column()
    transactiondetails:string;


}
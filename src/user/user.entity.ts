import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {

    @PrimaryGeneratedColumn()
    username: string;

    @Column({ length: 25 })
    password:string;

    @Column({ length: 25 })
    fullname:string;

    @Column('date') 
    dateofbirth:Date;

    @Column({ length: 25 })
    gender:string;

    @Column({ length: 25 })
    email:string;

    @Column() 
    issuspended:boolean;

    @Column() 
    participantflag:boolean;

    @Column({ length: 25 })
    university:string;

    @Column() 
    ownerflag:boolean;

    @Column({ length: 25 })
    organization:string;

    @Column({ length: 25 })
    nationalid:string;
}
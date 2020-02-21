import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberTEntity } from './member-t.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class MembersTService {

	private readonly memberTEntities: MemberTEntity[];


  constructor(
    @InjectRepository(MemberTEntity)
    private memberTRepository: Repository<MemberTEntity>,
  ) {
	this.memberTEntities = [
		{
			username: 'john',
			password: 'changeme',
			email: 'john@gmail.com',
			dateOfBirth: new Date(),
			fullname: 'johhhnnn',
			gender: 'male',
			isSuspended: false,
			participantFlag: true,
			ownerFlag: false,
			organization: 'Chula',
			nationalID: 'id',
			reviews: null,
			books: null
		},
		{
			username: 'chris',
			password: 'secret',
			email: 'john@gmail.com',
			dateOfBirth: new Date(),
			fullname: 'johhhnnn',
			gender: 'male',
			isSuspended: false,
			participantFlag: true,
			ownerFlag: false,
			organization: 'Chula',
			nationalID: 'id',
			reviews: null,
			books: null
		},
		{
			username: 'maria',
			password: 'guess',
			email: 'john@gmail.com',
			dateOfBirth: new Date(),
			fullname: 'johhhnnn',
			gender: 'male',
			isSuspended: false,
			participantFlag: true,
			ownerFlag: false,
			organization: 'Chula',
			nationalID: 'id',
			reviews: null,
			books: null
		}
	]
  }

  async findOne(username: string): Promise<MemberTEntity | undefined> {
  	  return this.memberTEntities.find(memberT => memberT.username === username);
  }

  async findAll(): Promise<MemberTEntity[]> {
    return await this.memberTRepository.find();
  }

  async create(memberTEntity: MemberTEntity): Promise<MemberTEntity> {
    return await this.memberTRepository.save(memberTEntity);
  }

  async update(memberTEntity: MemberTEntity): Promise<UpdateResult> {
    return await this.memberTRepository.update(
      memberTEntity.username,
      memberTEntity,
    );
  }

  async delete(username): Promise<DeleteResult> {
    return await this.memberTRepository.delete(username);
  }
}

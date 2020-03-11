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
  ) { }
  
	async findOne(username: string): Promise<MemberTEntity | undefined> {
		// console.log(username + " is trying to login");
		return this.memberTRepository.findOne({ username: username});
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

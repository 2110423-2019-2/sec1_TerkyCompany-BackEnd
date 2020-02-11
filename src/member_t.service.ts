import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { member_t } from './member_t.entity';

@Injectable()
export class member_tService {

    constructor(@InjectRepository(member_t) private member_tRepository: Repository<member_t>) { }

    async getmember_ts(member_t: member_t): Promise<member_t[]> {
        return await this.member_tRepository.find();
    }

    async getmember_t(_username: string): Promise<member_t[]> {
        return await this.member_tRepository.find({
            select: ["fullname","email"],
            where: [{ "username": _username }]
        });
    }

    async updatemember_t(member_t: member_t) {
        this.member_tRepository.save(member_t)
    }

    async deletemember_t(member_t: member_t) {
        this.member_tRepository.delete(member_t);
    }
}
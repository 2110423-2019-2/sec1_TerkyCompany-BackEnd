import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(user) private usersRepository: Repository<user>) { }

    async getUsers(user: user): Promise<user[]> {
        return await this.usersRepository.find();
    }

    async getUser(username: string): Promise<user[]> {
        return await this.usersRepository.find({
            select: ["fullname","email"],
            where: [{ "username": username }]
        });
    }

    async updateUser(user: user) {
        this.usersRepository.save(user)
    }

    async deleteUser(user: user) {
        this.usersRepository.delete(user);
    }
    async createUser(userData: user): Promise<user> {
        return await this.usersRepository.save(userData);
    }
}
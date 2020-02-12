import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {

    constructor(@InjectRepository(feedback) private feedbackRepository: Repository<feedback>) { }

    async getUsers(feedback: feedback): Promise<feedback[]> {
        return await this.feedbackRepository.find();
    }

    async getUser(feedbackid: string): Promise<feedback[]> {
        return await this.feedbackRepository.find({
            select: ["comment","username"],
            where: [{ "username": feedbackid }]
        });
    }

    async updateUser(feedback: feedback) {
        this.feedbackRepository.save(feedback)
    }

    async deleteUser(feedbackid: string) {
        this.feedbackRepository.delete(feedbackid);
    }

    async createFeedback(feedback: feedback): Promise<feedback> {
        return await this.feedbackRepository.save(feedback);
    }
}
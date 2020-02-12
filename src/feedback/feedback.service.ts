import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { feedback } from './feedback.entity';

@Injectable()
export class FeedbackService {

    constructor(@InjectRepository(feedback) private feedbackRepository: Repository<feedback>) { }
    //use for get "all" feedback at once json
    async getFeedbacks(feedback: feedback): Promise<feedback[]> {
        return await this.feedbackRepository.find();
    }
    //use for get specified feedback 
    async getFeedback(feedbackid: string): Promise<feedback[]> {
        return await this.feedbackRepository.find({
            select: ["comment","username"],
            where: [{ "username": feedbackid }]
        });
    }

    async updateFeedback(feedback: feedback) {
        this.feedbackRepository.save(feedback)
    }

    async deleteFeedback(feedbackid: string) {
        this.feedbackRepository.delete(feedbackid);
    }

    async createFeedback(feedback: feedback): Promise<feedback> {
        return await this.feedbackRepository.save(feedback);
    }
}
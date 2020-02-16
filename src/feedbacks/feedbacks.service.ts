import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from './feedback.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async findAll(): Promise<FeedbackEntity[]> {
    return await this.feedbackRepository.find();
  }

  async create(feedbackEntity: FeedbackEntity): Promise<FeedbackEntity> {
    return await this.feedbackRepository.save(feedbackEntity);
  }

  async update(feedbackEntity: FeedbackEntity): Promise<UpdateResult> {
    return await this.feedbackRepository.update(
      { id: feedbackEntity.id, memberT: feedbackEntity.memberT },
      feedbackEntity,
    );
  }

  async delete(id, username): Promise<DeleteResult> {
    return await this.feedbackRepository.delete({
		id,
		memberT: username
	});
  }
}

import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from './feedback.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@EntityRepository(FeedbackEntity)
export class FeedbackEntityRepository extends Repository<FeedbackEntity> {}

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(FeedbackEntity)
    private feedbackRepository: FeedbackEntityRepository,
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

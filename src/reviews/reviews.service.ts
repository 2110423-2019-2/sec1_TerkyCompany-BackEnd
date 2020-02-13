import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  async findAll(): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find();
  }

  async create(reviewEntity: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(reviewEntity);
  }

  async update(reviewEntity: ReviewEntity): Promise<UpdateResult> {
    return await this.reviewRepository.update(reviewEntity.id, reviewEntity);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.reviewRepository.delete(id);
  }
}

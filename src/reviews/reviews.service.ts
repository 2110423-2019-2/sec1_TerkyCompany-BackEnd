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
  async findByWorkshop(workshop_id): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({workshop: workshop_id,});
  }
  async findByUser(username): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({memberT: username,});
  }
  async findByComment(workshop_id,username): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({memberT: username,workshop: workshop_id,});
  }
  

  async create(reviewEntity: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(reviewEntity);
  }

  async update(reviewEntity: ReviewEntity): Promise<UpdateResult> {
    return await this.reviewRepository.update(
      {
        workshop: reviewEntity.workshop,
        memberT: reviewEntity.memberT,
      },
      reviewEntity,
    );
  }

  async delete(workshop_id, username): Promise<DeleteResult> {
    return await this.reviewRepository.delete({
      workshop: workshop_id,
      memberT: username,
    });
  }
}

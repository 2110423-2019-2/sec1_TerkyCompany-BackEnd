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
  async findByWorkshop(id): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({workshop: id,});
  }
  async findByUser(username): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({memberT: username,});
  }
  async findByComment(id,username): Promise<ReviewEntity[]> {
    return await this.reviewRepository.find({memberT: username,workshop: id,});
  }
  

  async create(reviewEntity: ReviewEntity): Promise<ReviewEntity> {
    return await this.reviewRepository.save(reviewEntity);
  }

  async update(reviewEntity: ReviewEntity): Promise<UpdateResult> {
    return await this.reviewRepository.update(
      {
        id: reviewEntity.id,
        workshop: reviewEntity.workshop,
        memberT: reviewEntity.memberT,
      },
      reviewEntity,
    );
  }

  async delete(id, workshop_id, username): Promise<DeleteResult> {
    return await this.reviewRepository.delete({
      id: id,
      workshop: workshop_id,
      memberT: username,
    });
  }
}

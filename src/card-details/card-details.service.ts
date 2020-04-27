import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDetailEntity } from './card-detail.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@EntityRepository(CardDetailEntity)
export class CardDetailEntityRepository extends Repository<CardDetailEntity> {}

@Injectable()
export class CardDetailsService {
  constructor(
    @InjectRepository(CardDetailEntity)
    private cardDetailRepository: CardDetailEntityRepository,
  ) {}

  async findAll(): Promise<CardDetailEntity[]> {
    return await this.cardDetailRepository.find();
  }

  async create(cardDetailEntity: CardDetailEntity): Promise<CardDetailEntity> {
    return await this.cardDetailRepository.save(cardDetailEntity);
  }

  async update(
    id,
    username,
    cardDetailEntity: CardDetailEntity,
  ): Promise<UpdateResult> {
    return await this.cardDetailRepository.update(
      { id: id, memberT: username },
      cardDetailEntity,
    );
  }

  async delete(id, username): Promise<DeleteResult> {
    return await this.cardDetailRepository.delete({
      id: id,
      memberT: username,
    });
  }
}

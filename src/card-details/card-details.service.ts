import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDetailEntity } from './card-detail.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CardDetailsService {
  constructor(
    @InjectRepository(CardDetailEntity)
    private cardDetailRepository: Repository<CardDetailEntity>,
  ) {}

  async findAll(): Promise<CardDetailEntity[]> {
    return await this.cardDetailRepository.find();
  }

  async create(cardDetailEntity: CardDetailEntity): Promise<CardDetailEntity> {
    return await this.cardDetailRepository.save(cardDetailEntity);
  }

  async update(cardDetailEntity: CardDetailEntity): Promise<UpdateResult> {
    return await this.cardDetailRepository.update(
      cardDetailEntity.id,
      cardDetailEntity,
    );
  }

  async delete(id): Promise<DeleteResult> {
    return await this.cardDetailRepository.delete(id);
  }
}

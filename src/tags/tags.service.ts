import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find();
  }

  async create(tagEntity: TagEntity): Promise<TagEntity> {
    return await this.tagRepository.save(tagEntity);
  }

  // ! Not sure
  async update(tagEntity: TagEntity): Promise<UpdateResult> {
    return await this.tagRepository.update(
      [tagEntity.workshop.id, tagEntity.tag],
      tagEntity,
    );
  }
 
  // ! Not sure
  async delete(id, tag): Promise<DeleteResult> {
    return await this.tagRepository.delete([id, tag]]);
  }
}

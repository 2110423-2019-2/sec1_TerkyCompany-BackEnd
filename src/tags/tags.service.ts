import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private tagRepository: Repository<TagEntity>,
  ) {}

  async findAll(): Promise<TagEntity[]> {
    return await this.tagRepository.find(); // {tag: "TAG_NAME"}
  }

  async create(tagEntity: TagEntity): Promise<TagEntity> {
    return await this.tagRepository.save(tagEntity);
  }

  async delete(id, tag): Promise<DeleteResult> {
    return await this.tagRepository.delete({ workshop: id, tag: tag });
  }
}

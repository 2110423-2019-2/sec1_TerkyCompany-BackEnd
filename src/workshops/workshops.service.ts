import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: Repository<Workshop>,
  ) {}

  async findAll(): Promise<Workshop[]> {
    return await this.workshopRepository.find();
  }

  async create(workshop: Workshop): Promise<Workshop> {
    return await this.workshopRepository.save(workshop);
  }

  async update(workshop: Workshop): Promise<UpdateResult> {
    return await this.workshopRepository.update(workshop.id, workshop);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.workshopRepository.delete(id);
  }
}

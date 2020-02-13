import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async create(bookEntity: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(bookEntity);
  }

  async update(bookEntity: BookEntity): Promise<UpdateResult> {
    return await this.bookRepository.update(
      [bookEntity.workshop.id, bookEntity.memberT.username],
      bookEntity,
    );
  }

  // ! Not sure about how to delete with 2 parameters
  async delete(id, username): Promise<DeleteResult> {
    return await this.bookRepository.delete([id, username]);
  }
}

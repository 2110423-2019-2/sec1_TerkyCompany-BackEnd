import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { WorkshopsService } from '../workshops/workshops.service';
import { Workshop } from '../workshops/workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity]), TypeOrmModule.forFeature([Workshop])], // Added dependencies of Workshop's Repository
  providers: [BooksService, WorkshopsService], // Added Services
  controllers: [BooksController],
})
export class BooksModule {}

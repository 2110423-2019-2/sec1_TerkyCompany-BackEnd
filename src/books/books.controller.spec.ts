import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService, BookEntityRepository } from './books.service';
import { WorkshopRepository, WorkshopsService } from '../workshops/workshops.service';

describe('Books Controller', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, WorkshopsService, BookEntityRepository, WorkshopRepository],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

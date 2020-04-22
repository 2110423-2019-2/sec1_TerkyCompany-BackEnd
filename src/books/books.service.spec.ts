import { Test, TestingModule } from '@nestjs/testing';
import { BooksService, BookEntityRepository } from './books.service';
import { WorkshopRepository } from '../workshops/workshops.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, BookEntityRepository, WorkshopRepository],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

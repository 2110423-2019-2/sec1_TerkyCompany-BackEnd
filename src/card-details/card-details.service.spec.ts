import { Test, TestingModule } from '@nestjs/testing';
import { CardDetailsService, CardDetailEntityRepository } from './card-details.service';

describe('CardDetailsService', () => {
  let service: CardDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardDetailsService, CardDetailEntityRepository],
    }).compile();

    service = module.get<CardDetailsService>(CardDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CardDetailsController } from './card-details.controller';
import { CardDetailsService, CardDetailEntityRepository } from './card-details.service';

describe('CardDetails Controller', () => {
  let controller: CardDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardDetailsController],
      providers: [CardDetailsService, CardDetailEntityRepository],
    }).compile();

    controller = module.get<CardDetailsController>(CardDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

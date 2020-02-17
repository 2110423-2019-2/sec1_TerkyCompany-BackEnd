import { Test, TestingModule } from '@nestjs/testing';
import { CardDetailsController } from './card-details.controller';

describe('CardDetails Controller', () => {
  let controller: CardDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardDetailsController],
    }).compile();

    controller = module.get<CardDetailsController>(CardDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksService, FeedbackEntityRepository } from './feedbacks.service';

describe('FeedbacksService', () => {
  let service: FeedbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbacksService, FeedbackEntityRepository],
    }).compile();

    service = module.get<FeedbacksService>(FeedbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

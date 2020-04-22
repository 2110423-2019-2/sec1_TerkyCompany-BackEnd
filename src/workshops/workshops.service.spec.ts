import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsService, WorkshopRepository } from './workshops.service';
import { Workshop } from './workshop.entity';

describe('WorkshopsService', () => {
  let service: WorkshopsService;
  let repo: WorkshopRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkshopsService, WorkshopRepository],
    }).compile();

    repo = module.get<WorkshopRepository>(WorkshopRepository);
    service = await module.resolve<WorkshopsService>(WorkshopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array', () => {
    expect(service.findAll()).toBeInstanceOf(Promise);
  })
})

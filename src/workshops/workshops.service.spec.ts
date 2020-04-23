import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsService } from './workshops.service';
import { Workshop } from './workshop.entity';
import { WorkshopRepository } from './workshop.repository';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { WorkshopsModule } from './workshops.module';

class MockRepo extends WorkshopRepository {
  async find(): Promise<any> {
    return Workshop;
  }
}

describe('WorkshopsService', () => {
  let app: INestApplication;
  let service: WorkshopsService;
  let repo: WorkshopRepository;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkshopsService,
        WorkshopRepository
      ],
    }).compile();

    repo = module.get<WorkshopRepository>(WorkshopRepository);
    service = await module.resolve<WorkshopsService>(WorkshopsService);
  });

  describe('findAll', () => {
    it('defined', () => {
      expect(repo).toBeDefined();
      expect(service).toBeDefined();
    })
  })
})

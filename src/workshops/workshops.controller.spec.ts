import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsController } from './workshops.controller';
import { WorkshopsService, WorkshopRepository } from './workshops.service';
import { MembersTModule } from '../members-t/members-t.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { INestApplication, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Workshop } from './workshop.entity';
import supertest = require('supertest');
import { TagsModule } from '../tags/tags.module';
import { WorkshopsModule } from './workshops.module';
import { TagEntity } from '../tags/tag.entity';
import * as request from 'supertest';
import { AppService } from 'src/app.service';

describe('WorkshopController', () => {
  let service: WorkshopsService;
  let controller: WorkshopsController;
  let repo: WorkshopRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopsController],
      providers: [WorkshopsService, WorkshopRepository],
    }).compile();

    repo = module.get<WorkshopRepository>(WorkshopRepository);
    service = await module.resolve<WorkshopsService>(WorkshopsService);
    controller = await module.resolve<WorkshopsController>(WorkshopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
})

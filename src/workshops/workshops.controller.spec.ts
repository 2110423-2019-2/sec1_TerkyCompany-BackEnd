import { Test, TestingModule } from '@nestjs/testing';
import { WorkshopsController } from './workshops.controller';
import { WorkshopsService } from './workshops.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';
import supertest = require('supertest');
import { WorkshopRepository } from './workshop.repository';

describe('WorkshopController', () => {
  let service: WorkshopsService;
  let controller: WorkshopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkshopsController],
      providers: [{
        provide: WorkshopsService,
        useValue: {
          findAll: jest.fn(() => new Promise((resolve, reject) => {
            //saving MyClass using http service
            //return the saved MyClass or error
            setTimeout( () => {
                resolve();
            }, 1500);
            }
          )),
          create: jest.fn()
        },
        
      }],
    }).compile();
    service = module.get<WorkshopsService>(WorkshopsService);
    controller = module.get<WorkshopsController>(WorkshopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

})

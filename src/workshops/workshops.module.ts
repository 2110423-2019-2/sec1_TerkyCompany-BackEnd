import { Module } from '@nestjs/common';
import { WorkshopsService, WorkshopRepository } from './workshops.service';
import { WorkshopsController } from './workshops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop]),
  MulterModule.register({
    dest: './uploads'
  }),
  
  ],
  providers: [WorkshopsService],
  controllers: [WorkshopsController],
})
export class WorkshopsModule {}

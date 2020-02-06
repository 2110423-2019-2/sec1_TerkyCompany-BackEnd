import { Module } from '@nestjs/common';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop])],
  providers: [WorkshopsService],
  controllers: [WorkshopsController],
})
export class WorkshopsModule {}

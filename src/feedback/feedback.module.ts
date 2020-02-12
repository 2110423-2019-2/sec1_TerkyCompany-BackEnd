import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { feedback } from './feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([feedback])],
  providers: [FeedbackService],
  controllers: [FeedbackController],
})

export class FeedbackModule { }
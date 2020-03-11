import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { MembersTModule } from './members-t/members-t.module';
import { CardDetailsModule } from './card-details/card-details.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BooksModule } from './books/books.module';
import { TagsModule } from './tags/tags.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'se_matcher',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    WorkshopsModule,
    MembersTModule,
    CardDetailsModule,
    FeedbacksModule,
    ReviewsModule,
    BooksModule,
    TagsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

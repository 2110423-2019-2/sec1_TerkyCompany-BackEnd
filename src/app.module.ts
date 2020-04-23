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
import { MulterModule } from '@nestjs/platform-express';
import { PaymentModule } from './payment/payment.module';
import { EasyconfigModule } from 'nestjs-easyconfig';

@Module({
  imports: [
    EasyconfigModule.register({ path: './config/.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: 3306,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
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
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

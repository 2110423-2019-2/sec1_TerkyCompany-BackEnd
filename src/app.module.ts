import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './user/user.module';
import { FeedbackModule } from './feedback/feedback.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule,FeedbackModule,BooksModule],
  controllers: [AppController,loginController],
  providers: [AppService],
})
export class AppModule {}

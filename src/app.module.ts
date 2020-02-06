import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Workshop } from './workshops/workshop.entity';
import { WorkshopsController } from './workshops/workshops.controller';
import { WorkshopsService } from './workshops/workshops.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'db',
      entities: [join(__dirname, '**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Workshop]),
    WorkshopsModule,
  ],
  controllers: [AppController, WorkshopsController],
  providers: [AppService, WorkshopsService],
})
export class AppModule {}

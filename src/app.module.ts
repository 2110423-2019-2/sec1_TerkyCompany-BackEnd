import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Workshop } from './workshops/workshop.entity';
import { WorkshopsController } from './workshops/workshops.controller';
import { WorkshopsService } from './workshops/workshops.service';
import { MembersTModule } from './members-t/members-t.module';
import { MemberTEntity } from './members-t/member-t.entity';
import { MembersTService } from './members-t/members-t.service';
import { MembersTController } from './members-t/members-t.controller';

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
    WorkshopsModule,
    MembersTModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

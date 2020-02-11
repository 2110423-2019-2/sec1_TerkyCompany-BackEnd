import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { user } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule { }
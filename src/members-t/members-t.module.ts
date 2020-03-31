import { Module } from '@nestjs/common';
import { MembersTService } from './members-t.service';
import { MembersTController } from './members-t.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberTEntity } from './member-t.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberTEntity]),
    MulterModule.register({
      dest: './uploads'
    })
  ],
  providers: [MembersTService],
  controllers: [MembersTController],
  exports: [MembersTService],
})
export class MembersTModule {}

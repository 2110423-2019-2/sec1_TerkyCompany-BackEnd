import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { member_t } from './member_t.entity';

@Module({
  imports: [TypeOrmModule.forFeature([member_t])],
  controllers: [AppController,loginController],
  providers: [AppService],
})
export class AppModule {}

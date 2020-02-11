import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginController } from './login.controller';

@Module({
  imports: [],
  controllers: [AppController,loginController],
  providers: [AppService],
})
export class AppModule {}

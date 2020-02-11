import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule],
  controllers: [AppController,loginController],
  providers: [AppService],
})
export class AppModule {}

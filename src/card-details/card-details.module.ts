import { Module } from '@nestjs/common';
import { CardDetailsService } from './card-details.service';
import { CardDetailsController } from './card-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardDetailEntity } from './card-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardDetailEntity])],
  providers: [CardDetailsService],
  controllers: [CardDetailsController],
})
export class CardDetailsModule {}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CardDetailEntity } from './card-detail.entity';
import { CardDetailsService } from './card-details.service';
@Controller('card-details')
export class CardDetailsController {
  constructor(private cardDetialServices: CardDetailsService) {}

  @Get()
  index(): Promise<CardDetailEntity[]> {
    return this.cardDetialServices.findAll();
  }

  @Post('create')
  async create(@Body() cardDetailData: CardDetailEntity): Promise<any> {
    return this.cardDetialServices.create(cardDetailData);
  }

  @Put(':id/:username/update')
  async update(
    @Param('id') id,
    @Param('username') username,
    @Body() cardDetailData: CardDetailEntity,
  ): Promise<any> {
    console.log(username);
    console.log(cardDetailData.memberT);
    cardDetailData.id = String(id);
    cardDetailData.memberT.username = String(username);
    console.log('Update #' + cardDetailData.id + ' : ', cardDetailData.memberT);
    return this.cardDetialServices.update(cardDetailData);
  }

  @Delete(':id/:username/delete')
  async delete(@Param('id') id, @Param('username') username): Promise<any> {
    return this.cardDetialServices.delete(id, username);
  }
}

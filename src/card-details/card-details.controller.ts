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
    // console.log('CREATE WEIIIII');
    // console.log(memberTData.username);
    // console.log(memberTData.password);

    return this.cardDetialServices.create(cardDetailData);
  }

  @Put(':id/update')
  async update(
    @Param('id') id,
    @Body() cardDetailData: CardDetailEntity,
  ): Promise<any> {
    cardDetailData.id = String(id);
    console.log('Update #' + cardDetailData.id);
    return this.cardDetialServices.update(cardDetailData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.cardDetialServices.delete(id);
  }
}

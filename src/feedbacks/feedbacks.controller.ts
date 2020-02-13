import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FeedbackEntity } from './feedback.entity';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbackServices: FeedbacksService) {}

  @Get()
  index(): Promise<FeedbackEntity[]> {
    return this.feedbackServices.findAll();
  }

  @Post('create')
  async create(@Body() feedbackData: FeedbackEntity): Promise<any> {
    // console.log('CREATE WEIIIII');
    // console.log(memberTData.username);
    // console.log(memberTData.password);

    return this.feedbackServices.create(feedbackData);
  }

  @Put(':id/update')
  async update(
    @Param('id') id,
    @Body() feedbackData: FeedbackEntity,
  ): Promise<any> {
    feedbackData.id = String(id);
    console.log('Update #' + feedbackData.id);
    return this.feedbackServices.update(feedbackData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.feedbackServices.delete(id);
  }
}

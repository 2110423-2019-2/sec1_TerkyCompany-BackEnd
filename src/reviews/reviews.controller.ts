import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReviewEntity } from './review.entity';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewServices: ReviewsService) {}

  @Get()
  index(): Promise<ReviewEntity[]> {
    return this.reviewServices.findAll();
  }

  @Post('create')
  async create(@Body() reviewData: ReviewEntity): Promise<any> {
    return this.reviewServices.create(reviewData);
  }

  @Put(':id/update')
  async update(
    @Param('id') id,
    @Body() reviewData: ReviewEntity,
  ): Promise<any> {
    reviewData.id = String(id);
    console.log('Update #' + reviewData.id);
    return this.reviewServices.update(reviewData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.reviewServices.delete(id);
  }
}

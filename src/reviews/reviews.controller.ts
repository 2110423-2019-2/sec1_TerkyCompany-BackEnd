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

	if(reviewData.rating < 0.5) reviewData.rating = 0.5;
	else if(reviewData.rating > 5.0) reviewData.rating = 5.0;

    return this.reviewServices.create(reviewData);
  }

  @Put(':id/:workshop_id/:username/update')
  async update(
    @Param('id') id,
    @Param('workshop_id') workshop_id,
    @Param('username') username,
    @Body() reviewData: ReviewEntity,
  ): Promise<any> {
    reviewData.id = String(id);
    reviewData.workshop = workshop_id;
    reviewData.memberT = username;
    console.log(
      'Update #' +
        reviewData.id +
        ' : ' +
        reviewData.workshop +
        ' : ' +
        reviewData.memberT,
    );
    return this.reviewServices.update(reviewData);
  }

  @Delete(':id/:workshop_id/:username/delete')
  async delete(
    @Param('id') id,
    @Param('workshop_id') workshop_id,
    @Param('username') username,
  ): Promise<any> {
    return this.reviewServices.delete(id, workshop_id, username);
  }
}

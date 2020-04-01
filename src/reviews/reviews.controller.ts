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
  @Get('findbyworkshop/:workshop_id')
	findByWorkshop(@Param('workshop_id') id): Promise<ReviewEntity[]> {
		return this.reviewServices.findByWorkshop(id)
  }
  @Get('findbyuser/:username')
	findByUser(@Param('username') username): Promise<ReviewEntity[]> {
		return this.reviewServices.findByUser(username)
  }
  @Get('findcomment/:workshop_id/:username')
	findComment(@Param('workshop_id') id,@Param('username') username): Promise<ReviewEntity[]> {
		return this.reviewServices.findByComment(id,username)
	}
  @Post('create')
  async create(@Body() reviewData: ReviewEntity): Promise<any> {

	if(reviewData.rating < 0.5) reviewData.rating = 0.5;
	else if(reviewData.rating > 5.0) reviewData.rating = 5.0;

    return this.reviewServices.create(reviewData);
  }

  @Put(':workshop_id/:username/update')
  async update(
    @Param('workshop_id') workshop_id,
    @Param('username') username,
    @Body() reviewData: ReviewEntity,
  ): Promise<any> {
    reviewData.workshop = workshop_id;
    reviewData.memberT = username;
    console.log(reviewData)
    console.log(
      'Update #' +
        reviewData.workshop +
        ' : ' +
        reviewData.memberT,
    );

	if(reviewData.rating < 0.5) reviewData.rating = 0.5;
	else if(reviewData.rating > 5.0) reviewData.rating = 5.0;

    return this.reviewServices.update(reviewData);
  }

  @Delete(':workshop_id/:username/delete')
  async delete(
    @Param('workshop_id') workshop_id,
    @Param('username') username,
  ): Promise<any> {
    return this.reviewServices.delete(workshop_id, username);
  }
}

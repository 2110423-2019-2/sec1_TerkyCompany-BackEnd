import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { feedback } from './feedback.entity';
import { get } from 'http';

@Controller('feedback')
export class FeedbackController {

    constructor(private service: FeedbackService) { }

    @Get()
    findAll(): string {
        return "hello world";
    }
    //access by goto localhost3000/feedback/1
    @Get(':id')
    get(@Param() params) {
        console.log(`get success with ${params}`);
        //return this.service.getFeedback(params.id);
        return {asd:"hello"};
    }

    @Post()
    async create(@Body() feedback: feedback) {
       // console.log(`user got by ${user.password} ${user.username}`);
        return this.service.createFeedback(feedback);
    }

    @Put()
    async update(@Body() feedback: feedback) {
        return this.service.updateFeedback(feedback);
    }

    @Delete(':id')
    async deleteUser(@Param() params) {
        console.log(`feedbackid : ${params.id}`)
        return this.service.deleteFeedback(params.id);
    }
}
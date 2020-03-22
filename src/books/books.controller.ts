import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BooksService } from './books.service';
import { Workshop } from '../workshops/workshop.entity';
import { WorkshopsService } from '../workshops/workshops.service';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';

@Controller('books')
export class BooksController {
  constructor(private bookServices: BooksService) {}

  @Get()
  index(): Promise<BookEntity[]> {
    console.log("got");
    return this.bookServices.findAll();
  }
  //@get(':username/:workshopID/get')
  

  @Post('create')
  async create(@Body() bookData: BookEntity): Promise<any> {
    // ! Doesn't check that reservedSeat must be less than or equal capacity of workshop
    return  this.bookServices.create(bookData);
    
  }

  @Put(':id/:username/update')
  async update(
    @Param('id') id,
    @Param('username') username,
    @Body() bookData: BookEntity,
  ): Promise<any> {
    bookData.workshop = id;
    bookData.memberT = username;
    console.log('Update #' + bookData.workshop);
    console.log('Update #' + bookData.memberT);
    return this.bookServices.update(bookData);
  }

  // ?
  @Delete(':id/:username/delete')
  async delete(@Param('id') id, @Param('username') username): Promise<any> {
    return this.bookServices.delete(id, username);
  }
}

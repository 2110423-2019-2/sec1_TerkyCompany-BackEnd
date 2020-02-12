import { Controller, Post, Body, Get, Put, Delete,Param} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './books.entity';
import { get } from 'http';

@Controller('books')
export class BookController {

    constructor(private service: BooksService) { }

    @Get()
    findAll(): string {
        return 'book page';
    }

    @Get(':username/:workshopid')
    get(@Param() params) {
        return this.service.getBook(params.username,params.workshopid);
    }

    @Post()
    async create(@Body() booksData: Books) {
       // console.log(`user got by ${user.password} ${user.username}`);
        return this.service.createBook(booksData);
    }

    @Put()
    async update(@Body() booksData: Books) {
        return this.service.updateBook(booksData);
    }
    //multiple key to delete
    @Delete(':username/:workshopid')
    async deleteUser(@Param() params) {
        return this.service.deleteBook(params.username,params.workshopid);
    }
}
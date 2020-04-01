import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BooksService } from './books.service';
import { WorkshopsService } from '../workshops/workshops.service';
import { FilesInterceptor } from '@nestjs/platform-express'
import { MemberTEntity } from 'src/members-t/member-t.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('books')
export class BooksController {
  constructor(private bookServices: BooksService, private workshopsService: WorkshopsService) {}

  @Get()
  index(): Promise<BookEntity[]> {
    console.log("got");
    return this.bookServices.findAll();
  }
  /*
  @Get('dummy/:id')
  dummytest(@Param('id') id): Promise<boolean> {
	  return this.workshopsService.canBook(id);
  }
  */
  @Get('findone/:id/:username')
  findone(@Param('id') id, @Param('username') username): Promise<BookEntity>{
    return this.bookServices.findOne(id, username);
  }

  @Get('findbyparticipant/:id')
  findbyparticipant(@Param('id') id): Promise<MemberTEntity[] | any> {
    return this.bookServices.findByParticipant(id);
  }

  @Post('create')
  async create(@Body() bookData: BookEntity): Promise<any> {
    var id = bookData.workshop;
    //console.log(id);
    var canBook = await this.workshopsService.canBook(String(id));
    //console.log(canBook);
    if(canBook)
      return await this.bookServices.create(bookData);
      else return "Failed to book due to capacity limit";
  }

  // @Post('create')
  // @UseInterceptors(FilesInterceptor('image', 1, {
  //   fileFilter: imageFileFilter,
  //   storage: diskStorage({
  //     destination: './uploads/ticket_picture',
  //     filename: editFileName
  //   })
  // }))
  // async create(@Body() Request, @UploadedFiles() file): Promise<any> {
  
  //   var bookData = JSON.parse(Request['request']);
    
  //   var id = bookData.workshop;
  //   //console.log(id);
  //   var canBook = await this.workshopsService.canBook(String(id));
  //   //console.log(canBook);
  //   if(canBook)
  //     return await this.bookServices.create(bookData);
  //   else return "Failed to book due to capacity limit";
  // }


  @Put(':workshop_id/:username/update')
  async update(
    @Param('workshop_id') workshop_id,
    @Param('username') username,
    @Body() bookData: BookEntity,
  ): Promise<any> {
    bookData.workshop = workshop_id;
    bookData.memberT = username;
    console.log('Update #' + bookData.workshop);
    console.log('Update #' + bookData.memberT);
    return this.bookServices.update(bookData);
  }

  // @Post(':id/:username/ticket')
  // @UseInterceptors(FilesInterceptor('image', 1, {
  //   fileFilter: imageFileFilter
  // }))
  // async setTicket(
  //   @Param('id') workshopID,
  //   @Param('username') username,
  //   @UploadedFiles() file
  // ){
  //   return this.bookServices.setTicket(workshopID, username, file[0].filename);
  // }

  @Get(':workshop_id/:username/ticket')
  async getProfile(@Param('workshop_id') workshop_id, @Param('username') username, @Res() res) {
    var bookData = await (this.bookServices.findOne(workshop_id, username));
    return res.sendFile(bookData['ticketURL'], { root: './uploads/ticket_picture'});
  }

  // ? For refunding
  @Delete(':workshop_id/:username/delete')
  async delete(@Param('workshop_id') workshop_id, @Param('username') username): Promise<any> {
    return this.bookServices.delete(workshop_id, username);
  }
}

// // -- filter extension
// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// }

// export const editFileName = (req, file, callback) => {
//   const name = file.originalname.split('.')[0];
//   const fileExtName = extname(file.originalname);
//   const randomName = Array(4)
//     .fill(null)
//     .map(() => Math.round(Math.random() * 16).toString(16))
//     .join('');
//   callback(null, `${name}-${randomName}${fileExtName}`);
// };
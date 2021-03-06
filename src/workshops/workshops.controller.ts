import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseInterceptors,
  UploadedFiles,
  Res, 
  Request
} from '@nestjs/common';
import { Workshop } from './workshop.entity';
import { WorkshopsService } from './workshops.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { response } from 'express';

@Controller('workshops')
export class WorkshopsController {
  constructor(private workshopsServices: WorkshopsService) {}

  @Get()
  index(): Promise<Workshop[]> {
    return this.workshopsServices.findAll();
  }

  @Get('findbyowner/:username')
  findbyowner(@Param('username') username): Promise<Workshop[]> {
    return this.workshopsServices.findByOwner(username);
  }
  
  @Get(':workshopID')
  findbyid(@Param('workshopID') workshopId): Promise<Workshop> {
    return this.workshopsServices.findByID(workshopId);
  }
  // // Get workshop details
  // @Get('detail/:id')
  // getWorkshopDetail(@Param('id') id) {
  //   var workshopID = this.workshopsServices.findByID(id);
  //    workshopID.
  // }


  // // upload picture on local 
  // @Post(':workshopID/picture')
  // @UseInterceptors(FilesInterceptor('image', 1, {
  //   fileFilter: this.imageFileFilter,
  // }))
  // async setProfile(@UploadedFiles() file, @Param('workshopID') workshopID): Promise<any> {
  //   // ! Caution: The current path is /sec1_TerkyCompany_Backend/
  //   var workshopData = await this.workshopsServices.findByID(workshopID); 

  //   if (workshopData['id'] == null)
  //     return "Please send a image via existing workshop id"

  //   return this.workshopsServices.setPictureURL(workshopID, file[0].filename);
  // }


  @Post('fileupload')
  async fileupload(@Req() request, @Res() respond) {
    try {
      await this.workshopsServices.fileupload(request, respond);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  @Post('create')
  async create(@Body() workshopData: Workshop): Promise<any> {
    // console.log(request);
    // var workshopData: Workshop = JSON.parse(workshopData['request']);
    // console.log(workshopData)
    // var workshopData: Workshop = Request;
    
    console.log('cost: ' + workshopData.cost,)

    if(workshopData.cost < 0) workshopData.cost = 0;
    else if(workshopData.cost > 99999.99) workshopData.cost = 99999.99;

    if(workshopData.capacity < 1) workshopData.capacity = 1;
    else if(workshopData.capacity > 10000) workshopData.capacity = 10000;

    // //S3
    // try {
    //   await this.workshopsServices.fileupload(request, response);
    // } catch (error) {
    //   return response
    //     .status(500)
    //     .json(`Failed to upload image file: ${error.message}`);
    // }

    // return 'yea'

    // console.log("response from upload file")
    // console.log(response)
    // workshopData['pictureURL'] = response.json();
    
    return await this.workshopsServices.create(workshopData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() workshopData: Workshop): Promise<any> {
    workshopData.id = String(id);
    console.log('Update #' + workshopData.id);

	if(workshopData.cost < 0) workshopData.cost = 0;
	else if(workshopData.cost > 99999.99) workshopData.cost = 99999.99;

	if(workshopData.capacity < 1) workshopData.capacity = 1;
	else if(workshopData.capacity > 10000) workshopData.capacity = 10000;

    return this.workshopsServices.update(workshopData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.workshopsServices.delete(id);
  }

  @Get(':workshopID/picture')
  getProfile(@Param('workshopID') workshopID, @Res() res) {
    var workshopData = (this.workshopsServices.findByID(workshopID));
    if (workshopData['pictureURL'] == '')
      return 'Failed to get the image' 
    return workshopData['pictureURL'];
  }
}

// -- filter extension
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
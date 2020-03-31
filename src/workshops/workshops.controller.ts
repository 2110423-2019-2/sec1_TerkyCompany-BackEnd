import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
  Res
} from '@nestjs/common';
import { Workshop } from './workshop.entity';
import { WorkshopsService } from './workshops.service';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  // // Get workshop details
  // @Get('detail/:id')
  // getWorkshopDetail(@Param('id') id) {
  //   var workshopID = this.workshopsServices.findByID(id);
  //    workshopID.
  // }


  @Post('create')
  async create(@Body() workshopData: Workshop): Promise<any> {
    console.log('cost: ' + workshopData.cost)

	if(workshopData.cost < 0) workshopData.cost = 0;
	else if(workshopData.cost > 99999.99) workshopData.cost = 99999.99;

	if(workshopData.capacity < 1) workshopData.capacity = 1;
	else if(workshopData.capacity > 10000) workshopData.capacity = 10000;

    return this.workshopsServices.create(workshopData);
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


  // upload picture on local 
  @Post(':workshopID/picture')
  @UseInterceptors(FilesInterceptor('image', 1, {
    fileFilter: imageFileFilter,
  }))
  async setProfile(@UploadedFiles() file, @Param('workshopID') workshopID): Promise<any> {
    // ! Caution: The current path is /sec1_TerkyCompany_Backend/
    var workshopData = this.workshopsServices.findByID(workshopID);

    if (workshopData['id'] == null)
      return "Please send a profile via existing username"
    return this.workshopsServices.setPictureURL(workshopID, file[0].filename);
	}

  @Get(':workshopID/picture')
  async getProfile(@Param('workshopID') workshopID, @Res() res) {
    var workshopData = (this.workshopsServices.findByID(workshopID));
    return res.sendFile(workshopData['pictureURL'], { root: './uploads'});
  }
}

// -- filter extension
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
}

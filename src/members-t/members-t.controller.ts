import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  Res,
  UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'
import { MemberTEntity } from './member-t.entity';
import { MembersTService } from './members-t.service';
import { callbackify } from 'util';
@Controller('members-t')
export class MembersTController {
  constructor(private membersTServices: MembersTService) {}

  @Get()
  index(): Promise<MemberTEntity[]> {
    return this.membersTServices.findAll();
  }

  @Post('create')
  async create(@Body() memberTData: MemberTEntity): Promise<any> {
    return this.membersTServices.create(memberTData);
  }

  @Put(':username/update')
  async update(
    @Param('username') username,
    @Body() memberTData: MemberTEntity,
  ): Promise<any> {
    memberTData.username = String(username);
    console.log('Update #' + memberTData.username);
    return this.membersTServices.update(memberTData);
  }

  @Delete(':username/delete')
  async delete(@Param('username') username): Promise<any> {
    return this.membersTServices.delete(username);
  }

  // upload picture into local file
  @Post()
  @UseInterceptors(FilesInterceptor('image', 1, {
    fileFilter: imageFileFilter
  }))
	async uploadPicture(@UploadedFiles() file) {

    // ! Caution: The current path is /sec1_TerkyCompany_Backend/
    console.log(process.cwd())

    const response = {
      originalname: file[0].originalname,
      filename: file[0].filename,
    };
    return response;
	}

	@Get(':imgpath')
	async seeUploadedFile(@Param('imgpath') image, @Res() res){
		return res.sendFile(image, { root: './uploads'});
	}
  
}

// ? filter
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
}
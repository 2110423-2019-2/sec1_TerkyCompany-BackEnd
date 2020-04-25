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
import { file, classBody } from '@babel/types';

@Controller('members-t')
export class MembersTController {
  constructor(private membersTServices: MembersTService) {}

  @Get()
  index(): Promise<MemberTEntity[]> {
    return this.membersTServices.findAll();
  }

  @Get('banned_list')
  async findAllBannedList(): Promise<MemberTEntity[]> {
    return await this.membersTServices.findAllBannedList();
  }

  @Get('findbyusername/:id')
  async findbyusername(@Param('id') id): Promise<MemberTEntity | undefined>{
    return await this.membersTServices.findByUsername(id);
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
    return await this.membersTServices.update(memberTData);
  }

  @Delete(':username/delete')
  async delete(@Param('username') username): Promise<any> {
    return await this.membersTServices.delete(username);
  }

  // upload picture on local 
  // @Post(':username/profile')
  // @UseInterceptors(FilesInterceptor('image', 1, {
  //   fileFilter: imageFileFilter,
  // }))
  // async setProfile(@UploadedFiles() file, @Param('username') username): Promise<any> {
  //   // ! Caution: The current path is /sec1_TerkyCompany_Backend/
  //   var memberTData = this.membersTServices.findByUsername(username);
  //   console.log(memberTData)
  //   if (memberTData['username'] == null)
  //     return "Please send a profile via existing username"
  //   return this.membersTServices.setProfile(username, file[0].filename);
	// }

  // @Get(':username/profile')
  // async getProfile(@Param('username') username, @Res() res) {
  //   var memberTData = await (this.membersTServices.findByUsername(username));
  //   console.log(memberTData);
  //   return res.sendFile(memberTData['profileURL'], { root: './uploads'});
  // }
  
}

// -- filter extension
// export const imageFileFilter = (req, file, callback) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// }

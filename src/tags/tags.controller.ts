import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagsService } from './tags.service';
@Controller('tags')
export class TagsController {
  constructor(private tagServices: TagsService) {}

  @Get()
  index(): Promise<TagEntity[]> {
    return this.tagServices.findAll();
  }

  @Post('create')
  async create(@Body() tagData: TagEntity): Promise<any> {
    // console.log('CREATE WEIIIII');
    // console.log(memberTData.username);
    // console.log(memberTData.password);

    return this.tagServices.create(tagData);
  }

  @Put(':id/update')
  async update(
    @Param('id') id,
    @Param('tag') tag,
    @Body() tagData: TagEntity,
  ): Promise<any> {
    tagData.workshop.id = String(id);
    tagData.tag = String(tag);
    console.log('Update #' + tagData.workshop.id);
    console.log('Update #' + tagData.tag);
    return this.tagServices.update(tagData);
  }

  @Delete(':id/:tag/delete')
  async delete(@Param('id') id, @Param('tag') tag): Promise<any> {
    return this.tagServices.delete(id, tag);
  }
}

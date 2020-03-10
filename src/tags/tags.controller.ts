import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TagEntity } from './tag.entity';
import { TagsService } from './tags.service';
@Controller('tags')
export class TagsController {
	constructor(private tagServices: TagsService) {}

	@Get()
	index(): Promise<TagEntity[]> {
		return this.tagServices.findAll();
	}
  
	@Get('findbytag/:id')
	findwithtag(@Param('id') id): Promise<TagEntity[]> {
		var splitted = id.split('&');
		return this.tagServices.findByTag(splitted);
	}

	@Post('create')
	async create(@Body() tagData: TagEntity): Promise<any> {
		console.log("Hello world");
		return this.tagServices.create(tagData);
	}

	// ! NO UPDATE/PUT because all attributes is composed of primary key.

	@Delete(':tag/:id/delete')
	async delete(@Param('id') id, @Param('tag') tag): Promise<any> {
		return this.tagServices.delete(id, tag);
	}
}

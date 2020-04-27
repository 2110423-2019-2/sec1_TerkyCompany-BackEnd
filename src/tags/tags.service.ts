import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { DeleteResult } from 'typeorm';

@EntityRepository(TagEntity)
export class TagEntityRepository extends Repository<TagEntity> {}

@Injectable()
export class TagsService {

	constructor(
		@InjectRepository(TagEntity)
		private tagRepository: TagEntityRepository,
	) {}

	async findAll(): Promise<TagEntity[]> {
		return await this.tagRepository.find(); // {tag: "TAG_NAME"}
	}

	async findById(id): Promise<TagEntity[]> {
  		return await this.tagRepository.find({
			workshop: id,
		});
	}
	
	async findByTag(id): Promise<TagEntity[] | any> {
		// console.log("Service id = " + id);

		var ret = await this.tagRepository.find();
		var currentTag;
		var foundTag = [];
		var foundWorkshop = [];
		// console.log(ret);

		for(var i = 0; i < id.length; ++i){
			currentTag = id[i];
			// console.log("currentTag = " + currentTag);
			for(var j = 0; j < ret.length; ++j){
				if(ret[j].tag === currentTag){
					foundTag.push(ret[j]);
					foundWorkshop.push(ret[j].workshop);
				}
			}
		}
		foundTag = foundTag.sort();
		// console.log(foundTag);
		foundWorkshop = foundWorkshop.sort();
		// console.log(foundWorkshop);

		var cnt = 0;
		var countWorkshop = {};
		
		for(var i = 0; i < foundWorkshop.length; ++i){
			if(!(foundWorkshop[i] in countWorkshop)){
				countWorkshop[foundWorkshop[i]] = 1;
			}
			else{
				countWorkshop[foundWorkshop[i]] += 1;
			}
		}

		var result = [];
		for(var i = 0; i < foundTag.length; ++i){
			var workshopName = foundTag[i].workshop;
			if(countWorkshop[workshopName] === id.length){
				result.push(foundTag[i]);
			}
		}
		
  		return result;
	}

	async create(tagEntity: TagEntity): Promise<TagEntity> {
		return await this.tagRepository.save(tagEntity);
	}

	async delete(id, tag): Promise<DeleteResult> {
		return await this.tagRepository.delete({ workshop: id, tag: tag });
	}

	async deletebyid(id): Promise<DeleteResult> {
		return await this.tagRepository.delete({ workshop: id});
	}
}

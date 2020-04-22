import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

@EntityRepository(Workshop)
export class WorkshopRepository extends Repository<Workshop> {}

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: WorkshopRepository,
  ) {}

  async findAll(): Promise<Workshop[]> {
    return await this.workshopRepository.find();
  }

  async findByID(workshopID: string): Promise<Workshop> {
    return await this.workshopRepository.findOne({id:workshopID});
  }

  async setPictureURL(workshopID: Workshop, image_path: string): Promise<UpdateResult> {
    return await this.workshopRepository.update(workshopID, { pictureURL: image_path});
  }

  async findByOwner(username): Promise<Workshop[]> {
    return await this.workshopRepository.find({ owner: username });
  }

  async findbyid(id): Promise<Workshop[]> {
    return await this.workshopRepository.find({ id: id });
  }

  async canBook(workshopId: string): Promise<boolean>{
	var targetWorkshop = await this.workshopRepository.findOne({ id: workshopId });
	var reservedSeats = targetWorkshop.reservedSeat;
	var capacity = targetWorkshop.capacity;
	//console.log(reservedSeats);
	//console.log(capacity);
	return reservedSeats < capacity;
  }

//   async getWorkshop(workshopId: string): Promise<Workshop[]> {
//     return await this.workshopRepository.find({
//         //select: ["*"],
//         where: [{ "id": workshopId}]
//     });
// }

//   async findone(id: string): Promise<any> {
//     console.log('find one OK')
//     return await this.workshopRepository.find({ 
//       select:['name','place','speakerName','startTime','endTime','capacity','cost','pictureURL','description'],
//       where : [{'id' : id}]
//     });
//   }
// 


  async create(workshop: Workshop): Promise<Workshop> {
    return await this.workshopRepository.save(workshop);
  }

  async update(workshop: Workshop): Promise<UpdateResult> {
    return await this.workshopRepository.update(workshop.id, workshop);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.workshopRepository.delete(id);
  }
}

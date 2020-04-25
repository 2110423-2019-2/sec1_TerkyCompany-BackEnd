import { Injectable,Req,Res } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Workshop } from './workshop.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@EntityRepository(Workshop)
export class WorkshopRepository extends Repository<Workshop> { }

@Injectable()
export class WorkshopsService {
  constructor(
    @InjectRepository(Workshop)
    private workshopRepository: WorkshopRepository,
  ) { }

  async findAll(): Promise<Workshop[]> {
    return await this.workshopRepository.find();
  }

  async findByID(workshopID: string): Promise<Workshop> {
    return await this.workshopRepository.findOne({ id: workshopID });
  }

  async setPictureURL(workshopID: Workshop, image_path: string): Promise<UpdateResult> {
    return await this.workshopRepository.update(workshopID, { pictureURL: image_path });
  }

  async findByOwner(username): Promise<Workshop[]> {
    return await this.workshopRepository.find({ owner: username });
  }

  async findbyid(id): Promise<Workshop[]> {
    return await this.workshopRepository.find({ id: id });
  }

  async canBook(workshopId: string): Promise<boolean> {
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

  async fileupload(@Req() req, @Res() res) {
    try {
      req.header = req.header['image']
      req.body = req.body['image'];
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        // console.log(req)
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET_NAME,
      acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
    }),
  }).array('upload', 1);
}

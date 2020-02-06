import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Workshop } from './workshop.entity';
import { WorkshopsService } from './workshops.service';

@Controller('workshops')
export class WorkshopsController {
  constructor(private workshopsServices: WorkshopsService) {}

  @Get()
  index(): Promise<Workshop[]> {
    return this.workshopsServices.findAll();
  }

  @Post('create')
  async create(@Body() workshopData: Workshop): Promise<any> {
    return this.workshopsServices.create(workshopData);
  }

  @Put(':workshop_id/update')
  async update(
    @Param('workshop_id') workshop_id,
    @Body() workshopData: Workshop,
  ): Promise<any> {
    workshopData.workshop_id = Number(workshop_id);
    console.log('Update #' + workshopData.workshop_id);
    return this.workshopsServices.update(workshopData);
  }

  @Delete(':workshop_id/delete')
  async delete(@Param('workshop_id') workshop_id): Promise<any> {
    return this.workshopsServices.delete(workshop_id);
  }
}

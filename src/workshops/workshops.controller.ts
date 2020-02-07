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

  @Put(':id/update')
  async update(@Param('id') id, @Body() workshopData: Workshop): Promise<any> {
    workshopData.id = String(id);
    console.log('Update #' + workshopData.id);
    return this.workshopsServices.update(workshopData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.workshopsServices.delete(id);
  }
}

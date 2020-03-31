import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
  } from '@nestjs/common';

  import { PaymentService } from './payment.service';
  import { PaymentDto } from './payment.dto';
  
  @Controller('payment')
  export class PaymentController {
    constructor(private paymentServices: PaymentService) {}
  
  
    @Post('create')
    async create(@Body() paymentData: PaymentDto): Promise<any> {
      console.log('token: ' + paymentData.token)
      return this.paymentServices.create(paymentData);
    }
  
  }
  
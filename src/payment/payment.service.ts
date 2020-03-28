import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { PaymentDto } from './payment.dto';


@Injectable()
export class PaymentService {
    constructor() { }
    async create(paymentDto: PaymentDto): Promise<Response> {
        console.log(paymentDto)
        try {
            var omise = require('omise')({
                'secretKey': 'skey_test_5jasznzd3mff0xhs8nm',
                'publicKey': 'pkey_test_5jat0453twxxl7wh47y'
            });
            const email = paymentDto.email;
            const name = paymentDto.name;
            const token = paymentDto.token;
            const amount = paymentDto.amount*100; 
            const customer = await omise.customers.create({
                email,
                description: name,
                card: token
            });

            const charge = await omise.charges.create({
                // amount,
                amount,
                currency: "thb",
                customer: customer.id
            })

            console.log("charge >> ",charge)
            return charge;

        }
        catch(error) {
            console.log(error)
        }
        
    }

}

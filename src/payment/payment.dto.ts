import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsOptional,
} from 'class-validator';
import { ToInt, ToFloat } from 'class-sanitizer';

export class PaymentDto {
    
    @IsString()
    email: string;

    @IsString()
    name: string;
    @IsNumber()
    amount: number;
    @IsString()
    token: string;

}
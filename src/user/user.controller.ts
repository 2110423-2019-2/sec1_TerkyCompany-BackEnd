import { Controller, Post, Body, Get, Put, Delete,Param, Req} from '@nestjs/common';
import { UsersService } from './user.service';
import { user } from './user.entity';
import { get } from 'http';
import { Request } from 'express';

//try localhost:3000/users/regis or localhost:3000/users/login 
@Controller('/users')
export class UsersController {

    constructor(private service: UsersService) { }

    @Get()
    findAll(): string {
        return 'users page';
    }

    /*@Get('/:id')
    get(@Param() params) {
        return this.service.getUser(params.id);
    }*/

    @Post()
    create(@Body() userData: user) {
       // console.log(`user got by ${user.password} ${user.username}`);
        return this.service.createUser(userData)
    }

    @Put()
    update(@Body() user: user) {
        return this.service.updateUser(user);
    }
    //send key to delete
    @Delete(':id')
    deleteUser(@Param() params) {
        return this.service.deleteUser(params.id);
    }
    
    @Get('/login')
    loginPage(@Req() request:Request):string {
        return 'login page';
    }

    @Get('/regis')
    regisPage(@Req() request:Request):string {
        return 'regis page';
    }
    //http post for registeration
    //_userData for non public var
    @Post('/regis')
    regis(@Body() _userData: user) {
        return this.service.createUser(_userData)
    }
}
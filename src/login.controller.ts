import { Controller, Get, Post, Body } from '@nestjs/common';
import {loginDto} from './login-dto';

/*class loginFm {
    name : string;
    password : string;
}*/
@Controller('login')
export class loginController {
  //login page
  @Get()
  findAll(): string {
    return 'login page';
  }

  //recieve username and password by http post [josn format]
  /* example
  {
      "name"="terky"
      "password"="k32m5ds"
  }
  */
  @Post()
  async create(@Body() loginData: loginDto) {
      console.log(`post success with ${loginData} ${loginData.name}`);
    return `#${loginData.name} ${loginData.password}`;
  }
}
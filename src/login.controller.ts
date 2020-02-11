import { Controller, Get, Post, Body } from '@nestjs/common';
import {loginDto} from './login-dto';
import { member_tService } from './member_t.service';
import { member_t } from './member_t.entity';

/*class loginFm {
    name : string;
    password : string;
}*/
@Controller('login')
export class loginController {
  //login page
  constructor(private service: member_tService) { }
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
      console.log(`post got with ${loginData} ${loginData.name}`);
    return `#${loginData.name} ${loginData.password}`;
    //return this.service.getmember_t(loginData.name)
  }
}
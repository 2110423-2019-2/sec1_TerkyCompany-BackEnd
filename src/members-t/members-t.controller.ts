import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { MemberTEntity } from './member-t.entity';
import { MembersTService } from './members-t.service';
@Controller('members-t')
export class MembersTController {
  constructor(private membersTServices: MembersTService) {}

  @Get()
  index(): Promise<MemberTEntity[]> {
    return this.membersTServices.findAll();
  }

  @Post('create')
  async create(@Body() memberTData: MemberTEntity): Promise<any> {
    // console.log('CREATE WEIIIII');
    // console.log(memberTData.username);
    // console.log(memberTData.password);

    return this.membersTServices.create(memberTData);
  }

  @Put(':username/update')
  async update(
    @Param('username') username,
    @Body() memberTData: MemberTEntity,
  ): Promise<any> {
    memberTData.username = String(username);
    console.log('Update #' + memberTData.username);
    return this.membersTServices.update(memberTData);
  }

  @Delete(':username/delete')
  async delete(@Param('username') username): Promise<any> {
    return this.membersTServices.delete(username);
  }
}

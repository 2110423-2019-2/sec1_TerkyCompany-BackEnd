import { Injectable } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberTEntity } from './member-t.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { callbackify } from 'util';

@EntityRepository(MemberTEntity)
export class MemberTEntityRepository extends Repository<MemberTEntity> {

}

@Injectable()
export class MembersTService {
  constructor(
    @InjectRepository(MemberTEntity)
    private memberTRepository: MemberTEntityRepository,
  ) { }

  async findAllBannedList(): Promise<MemberTEntity[]> {
    return await this.memberTRepository.find({ isBanned: true });
  }

  async findByUsername(username: string): Promise<MemberTEntity | undefined> {
    // console.log(username + " is trying to login");
    // Don't forget await! Or you'll get Promise<Pending> as a result!
    var user = await this.memberTRepository.find({
      username: username
    });
    // console.log(user);
    return user[0];
  }

  async findAll(): Promise<MemberTEntity[]> {
    return await this.memberTRepository.find();
  }

  async create(memberTEntity: MemberTEntity): Promise<MemberTEntity> { 
    // BCRYPT
    var hash = AuthService.hashPasswordSync(memberTEntity.password, 12);
    // console.log(hash);
    // console.log(memberTEntity.username + "'s unhashed password: [" + memberTEntity.password + "]");
    // console.log("Hashed password: " + hash);
    
    var match = AuthService.compareSync(memberTEntity.password, hash);
    
    memberTEntity.password = hash;
    // console.log("Match:" + match);
    return await this.memberTRepository.save(memberTEntity);
  }

  async update(memberTEntity: MemberTEntity): Promise<UpdateResult> {
    var hash = AuthService.hashPasswordSync(memberTEntity.password, 12);
    memberTEntity.password=hash
    return await this.memberTRepository.update(
      memberTEntity.username,
      memberTEntity,
    );
  }

  // async setProfile(username: number, image_path: string) {
  //   return await this.memberTRepository.update(username, { profileURL: image_path });
  // }

  async delete(username): Promise<DeleteResult> {
    return await this.memberTRepository.delete(username);
  }
}

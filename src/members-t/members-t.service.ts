import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberTEntity } from './member-t.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { callbackify } from 'util';

@Injectable()
export class MembersTService {

  private readonly memberTEntities: MemberTEntity[];


  constructor(
    @InjectRepository(MemberTEntity)
    private memberTRepository: Repository<MemberTEntity>,
  ) { }

  async findByUsername(username: string): Promise<MemberTEntity | undefined> {
    // console.log(username + " is trying to login");
    // Don't forget await! Or you'll get Promise<Pending> as a result!
    var user = await this.memberTRepository.find({
      username: username
    });
    console.log(user);
    return user[0];
  }

  async findAll(): Promise<MemberTEntity[]> {
    return await this.memberTRepository.find();
  }

  async create(memberTEntity: MemberTEntity): Promise<MemberTEntity> { // Need to fix the returning value
    // BCRYPT
    /*
    var hash = AuthService.hashPassword('myPassword', 12, async (err, hash) => {
      // store the new hash in the database etc
      console.log("HASHING error: " + err);
      console.log(hash);
      console.log(memberTEntity.username + "'s unhashed password: [" + memberTEntity.password + "]");
      console.log("Hashed password: " + hash);
      AuthService.compare(memberTEntity.password, hash, (err, match) => {
        console.log("Password match: " + match); // WHY DOES IT NOT MATCH EVEN RIGHT AFTER HASHING
      });
      memberTEntity.password = hash;

      // console.log(memberTEntity);
      await this.memberTRepository.save(memberTEntity);

    });
    
    // console.log(hash);
    return await this.memberTRepository.findOne({ username: memberTEntity.username });
    */
   return await this.memberTRepository.save(memberTEntity);
  }

  async update(memberTEntity: MemberTEntity): Promise<UpdateResult> {

    return await this.memberTRepository.update(
      memberTEntity.username,
      memberTEntity,
    );
  }

  async setProfile(username: number, image_path: string) {
    return await this.memberTRepository.update(username, { profileURL: image_path });
  }

  async delete(username): Promise<DeleteResult> {
    return await this.memberTRepository.delete(username);
  }
}

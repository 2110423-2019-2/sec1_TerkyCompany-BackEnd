import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Workshop } from 'src/workshops/workshop.entity';
import { MemberTEntity } from 'src/members-t/member-t.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
  ) {}

  async findOne(workshopID, username): Promise<BookEntity> {
    /*
    return await this.bookRepository.find({
      where: {
        workshop: workshopID, 
        username: username
      }
    })[0];*/
    var bookList = await this.bookRepository.find();
    var ret;
    for(var i = 0; i < bookList.length; ++i){
      var e = bookList[i];
      // console.log(e.memberT);
      // console.log(e.memberT.username);
      if(e.memberT == username && e.workshop == workshopID){
        // console.log("FOUND");
        ret = e;
        break;
      }
    }
    return ret;
  }

  async findByParticipant(username): Promise<MemberTEntity[] | any> {
    var bookList = await this.bookRepository.find();
    var ret = [];
    for(var i = 0; i < bookList.length; ++i){
      var e = bookList[i];
      // console.log(e.memberT);
      // console.log(e.memberT.username);
      if(e.memberT == username){
        // console.log("FOUND");
        ret.push(e);
      }
    }
    return ret;
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.bookRepository.find();
  }

  async create(bookEntity: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(bookEntity);
  }

  async update(bookEntity: BookEntity): Promise<UpdateResult> {
    return await this.bookRepository.update(
      { workshop: bookEntity.workshop, memberT: bookEntity.memberT },
      bookEntity,
    );
  }

  async setTicket(workshopID, username, ticket_path) {
    return await this.bookRepository.update(
      { workshop: workshopID, memberT: username }, 
      { ticketURL: ticket_path })
  }

  // ! Not sure about how to delete with 2 parameters
  async delete(id, username): Promise<DeleteResult> {
    return await this.bookRepository.delete({
      workshop: id,
      memberT: username,
    });
  }
}

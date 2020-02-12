import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { user } from 'src/user/user.entity';

@Injectable()
export class BooksService {

    constructor(@InjectRepository(Books) private feedbackRepository: Repository<Books>) { }

    async getBooks(booksData: Books): Promise<Books[]> {
        return await this.feedbackRepository.find();
    }

    async getBook(username: string,workshopid :string): Promise<Books[]> {
        return await this.feedbackRepository.find({
            select: ["timebooked","hasparticipated","transactiondetails"],
            where: [{ "username": username,"workshopid":workshopid}]
        });
    }

    async updateBook(booksData: Books) {
        this.feedbackRepository.save(booksData)
    }

    //delete with 2 keys
    async deleteBook(username: string,workshopid :string) {
        this.feedbackRepository.delete({"username":username,"workshopid":workshopid});
    }

    async createBook(booksData: Books): Promise<Books> {
        return await this.feedbackRepository.save(booksData);
    }
}
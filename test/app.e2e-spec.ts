import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { response } from 'express';
import { doesNotReject } from 'assert';

const memberTBody = {
  "username": "owner6",
  "password": "password",
  "email": "too_w_o@hotmail.com",
  "dateOfBirth": "2012-04-23",
  "fullname": "Thanit Tativannarat",
  "gender": "male",
  "isSuspended": false,
  "participantFlag": false,
  "ownerFlag": true,
  "organization": "DataLabs",
  "nationalID": "123123123",
  "profileURL": ""
}

describe('E2E', () => {
  
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Review', () => {
    it('/reviews (GET)', () => {
      return request(app.getHttpServer())
        .get('/reviews')
        .expect(200)
        .expect([]);
    })
  })

  describe('MemberT', () => {
    it('/members-t (GET)', () =>{ 
      return request(app.getHttpServer())
      .get('/members-t')
      .expect(200)
      .expect([]);
    })

    it('/members-t (POST)', () => {
      return request(app.getHttpServer())
      .post('/members-t/create')
      .expect(500)
    })

    it('/members-t (POST with valid gender)', () => {
      return request(app.getHttpServer())
      .post('/members-t/create')
      .send(memberTBody)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
    })

    it('/members-t (POST with invalid gender)', () => {
      var memberTInvalidGender = memberTBody;
      memberTInvalidGender.gender = "asdfjkl"
      return request(app.getHttpServer())
      .post('/members-t/create')
      .send(memberTInvalidGender)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
    })
    /*
    it('/members-t (UPDATE with valid gender)', () => {

    })
    */
    it('/delete (DELETE)', () => {
      return request(app.getHttpServer())
      .delete('/members-t/owner6/delete')
      .expect(200)
    })

    it('Verify the deletion', () =>{ 
      return request(app.getHttpServer())
      .get('/members-t')
      .expect(200)
      .expect([]);
    })
  })
  
});
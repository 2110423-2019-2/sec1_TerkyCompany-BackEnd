import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { doesNotReject } from 'assert';

const defaultMemberTBody = {
    "username": "aaa",
    "password": "bbb",
    "organization": "Game Lab",
    "email": "pon@terkycompany.com",
    "dateOfBirth": "1999-03-23",
    "fullname": "Phatcharapon Jumruspun",
    "gender": "male",
    "isSuspended": false,
    "userType": "owner",
    "nationalID": "ccc"
    //"profileURL": ""
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
/*
    afterAll(async () => {
        return request(app.getHttpServer())
            .delete('/members-t/username/delete')
            .expect(200);
    });
*/
    function m2testFunc(username, password, nationalID, code) {
        var testBody = defaultMemberTBody;
        testBody.username = username;
        testBody.password = password;
        testBody.nationalID = nationalID;
        return request(app.getHttpServer())
            .post('/members-t/create')
            .send(testBody)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(code);
    }

    it('Test connection...', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });

    describe('M2 Test cases', () => {
        it('Check if MemberT is empty', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })

        it('M2-01', () => {
            return m2testFunc(
                "user",
                "pas",
                "abc",
                500
            );
        })

        it('M2-20 Status Code 201', () => {
            return m2testFunc(
                "username",
                "password",
                "1234567890123",
                201
            );
        })

        it('M2-20 Create MemberT', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect(response => {
                    //console.log(JSON.parse(response.text));
                    if(JSON.parse(response.text)[0].username != "username") 
                        throw new Error('Wrong Response');
                })
        })

        it('Clean MemberT', () => {
            return request(app.getHttpServer())
            .delete('/members-t/username/delete')
            .expect(200);
        })

        it('Check if MemberT is cleaned', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })
    })
    /*
    describe('Review', () => {
        it('/reviews (GET)', () => {
            return request(app.getHttpServer())
                .get('/reviews')
                .expect(200)
                .expect([]);
        })
    })

    describe('MemberT', () => {
        it('/members-t (GET)', () => {
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

        it('/delete (DELETE)', () => {
            return request(app.getHttpServer())
                .delete('/members-t/owner6/delete')
                .expect(200)
        })

        it('Verify the deletion', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })
    })
    */

});
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { doesNotReject } from 'assert';
import e = require('express');

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

const defaultWorkshopBody = {
    "id": "defaultworkshop",
    "startTime": "2012-04-23T18:25:43.511Z",
    "endTime": "2012-04-23T18:25:43.511Z",
    "name": "How to get A (SE)",
    "place": "Chula Engineering Building 3",
    "deadlineTime": "2012-04-23T18:25:43.511Z",
    "publishTime": "2012-04-23T18:25:43.511Z",
    "description": "No comment",
    "pictureURL": "-",
    "speakerName": "Park",
    "owner": "owner2",
    "capacity": "ee",
    "cost": "ii"
}

const mockMemberT = {
    "username": "owner2",
    "password": "password",
    "organization": "Owner2org",
    "email": "owner2@gmail.com",
    "dateOfBirth": "2000-01-01",
    "fullname": "Owner Two",
    "gender": "female",
    "isSuspended": false,
    "userType": "owner",
    "nationalID": "1231231231231"
    //"profileURL": ""
}

const mockWorkshop = {
    "id": "workshop2",
    "startTime": "2012-04-23T18:25:43.511Z",
    "endTime": "2012-04-23T18:25:43.511Z",
    "name": "A workshop",
    "place": "Your home",
    "deadlineTime": "2012-04-23T18:25:43.511Z",
    "publishTime": "2012-04-23T18:25:43.511Z",
    "description": "No description",
    "pictureURL": "-",
    "speakerName": "Too",
    "owner": "owner2",
    "capacity": 80,
    "cost": 100
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

    function addMockData(url){
        var temp;
        if(url == '/workshops'){
            temp = mockWorkshop;
        }
        else if(url == '/members-t'){
            temp = mockMemberT;
        }
        else throw new Error('URL passing error');
        return request(app.getHttpServer())
            .post(url + '/create')
            .send(temp)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);
    }

    function checkMockData(url){
        return request(app.getHttpServer())
                .get(url)
                .expect(200)
                .expect(response => {
                    // console.log(JSON.parse(response.text));
                    if (JSON.parse(response.text) == "[]")
                        throw new Error(url + 'has not been added');
                })
    }

    function m1testFunc(username, password, code) {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({
                "username": username,
                "password": password
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(code);
    }

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

    function w1testFunc(capacity, cost, code) {
        var testBody = defaultWorkshopBody;
        testBody.capacity = capacity;
        testBody.cost = cost;
        return request(app.getHttpServer())
            .post('/workshops/create')
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

    describe('[M1] Authentication System', () => {
        it('Check if MemberT is empty', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })

        it('Add mock data', () => {
            return addMockData('/members-t');
        })

        it('Check if mock data is created', () => {
            return checkMockData('/members-t');
        })

        it('M1-01', () => {
            m1testFunc(
                "owner1",
                "notapassword",
                401
            )
        })

        it('M1-02', () => {
            m1testFunc(
                "owner1",
                "password",
                401
            )
        })

        it('M1-03', () => {
            m1testFunc(
                "owner2",
                "notapassword",
                401
            )
        })

        it('M1-04', () => {
            m1testFunc(
                "owner2",
                "password",
                200
            )
        })

        // Could check token validity here

        it('Clean MemberT', () => {
            return request(app.getHttpServer())
                .delete('/members-t/owner2/delete')
                .expect(200);
        })

        it('Check if MemberT is cleaned', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })
    })

    describe('[M2] Registration System', () => {
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

        it('M2-02', () => {
            return m2testFunc(
                "user",
                "pas",
                "123",
                500
            );
        })

        it('M2-03', () => {
            return m2testFunc(
                "user",
                "pas",
                "abcabcabcabca",
                500
            );
        })

        it('M2-04', () => {
            return m2testFunc(
                "user",
                "pas",
                "1234567890123",
                500
            );
        })

        it('M2-05', () => {
            return m2testFunc(
                "user",
                "password",
                "abc",
                500
            );
        })

        it('M2-06', () => {
            return m2testFunc(
                "user",
                "password",
                "123",
                500
            );
        })

        it('M2-07', () => {
            return m2testFunc(
                "user",
                "password",
                "abcabcabcabca",
                500
            );
        })

        it('M2-08', () => {
            return m2testFunc(
                "user",
                "password",
                "1234567890123",
                500
            );
        })

        it('M2-09', () => {
            return m2testFunc(
                "user",
                "passwordpasswordpassw",
                "abc",
                500
            );
        })

        it('M2-10', () => {
            return m2testFunc(
                "user",
                "passwordpasswordpassw",
                "123",
                500
            );
        })

        it('M2-11', () => {
            return m2testFunc(
                "user",
                "passwordpasswordpassw",
                "abcabcabcabca",
                500
            );
        })

        it('M2-12', () => {
            return m2testFunc(
                "user",
                "passwordpasswordpassw",
                "1234567890123",
                500
            );
        })

        it('M2-13', () => {
            return m2testFunc(
                "username",
                "pas",
                "abc",
                500
            );
        })

        it('M2-14', () => {
            return m2testFunc(
                "username",
                "pas",
                "123",
                500
            );
        })

        it('M2-15', () => {
            return m2testFunc(
                "username",
                "pas",
                "abcabcabcabca",
                500
            );
        })

        it('M2-16', () => {
            return m2testFunc(
                "username",
                "pas",
                "1234567890123",
                500
            );
        })

        it('M2-17', () => {
            return m2testFunc(
                "username",
                "password",
                "abc",
                500
            );
        })

        it('M2-18', () => {
            return m2testFunc(
                "username",
                "password",
                "123",
                500
            );
        })

        it('M2-19', () => {
            return m2testFunc(
                "username",
                "password",
                "abcabcabcabca",
                500
            );
        })

        it('M2-20 Response Code: 201', () => {
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
                    // console.log(JSON.parse(response.text));
                    if (JSON.parse(response.text) == "[]")
                        throw new Error('Member has not been added');
                })
        })

        it('M2-21', () => {
            return m2testFunc(
                "username",
                "passwordpasswordpassw",
                "abc",
                500
            );
        })

        it('M2-22', () => {
            return m2testFunc(
                "username",
                "passwordpasswordpassw",
                "123",
                500
            );
        })

        it('M2-23', () => {
            return m2testFunc(
                "username",
                "passwordpasswordpassw",
                "abcabcabcabca",
                500
            );
        })

        it('M2-24', () => {
            return m2testFunc(
                "username",
                "passwordpasswordpassw",
                "1234567890123",
                500
            );
        })

        it('M2-25', () => {
            return m2testFunc(
                "usernameusernameusern",
                "pas",
                "abc",
                500
            );
        })

        it('M2-26', () => {
            return m2testFunc(
                "usernameusernameusern",
                "pas",
                "123",
                500
            );
        })

        it('M2-27', () => {
            return m2testFunc(
                "usernameusernameusern",
                "pas",
                "abcabcabcabca",
                500
            );
        })

        it('M2-28', () => {
            return m2testFunc(
                "usernameusernameusern",
                "pas",
                "1234567890123",
                500
            );
        })

        it('M2-29', () => {
            return m2testFunc(
                "usernameusernameusern",
                "password",
                "abc",
                500
            );
        })

        it('M2-30', () => {
            return m2testFunc(
                "usernameusernameusern",
                "password",
                "123",
                500
            );
        })

        it('M2-31', () => {
            return m2testFunc(
                "usernameusernameusern",
                "password",
                "abcabcabcabca",
                500
            );
        })

        it('M2-32', () => {
            return m2testFunc(
                "usernameusernameusern",
                "password",
                "1234567890123",
                500
            );
        })

        it('M2-33', () => {
            return m2testFunc(
                "usernameusernameusern",
                "passwordpasswordpassw",
                "abc",
                500
            );
        })

        it('M2-34', () => {
            return m2testFunc(
                "usernameusernameusern",
                "passwordpasswordpassw",
                "123",
                500
            );
        })

        it('M2-35', () => {
            return m2testFunc(
                "usernameusernameusern",
                "passwordpasswordpassw",
                "abcabcabcabca",
                500
            );
        })

        it('M2-36', () => {
            return m2testFunc(
                "usernameusernameusern",
                "passwordpasswordpassw",
                "1234567890123",
                500
            );
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

    describe('[W1] Workshop Creation', () => {
        it('Check if Workshop is empty', () => {
            return request(app.getHttpServer())
                .get('/workshops')
                .expect(200)
                .expect([]);
        })

        it('Check if MemberT is empty', () => {
            return request(app.getHttpServer())
                .get('/members-t')
                .expect(200)
                .expect([]);
        })

        it('Add MemberT Mock Data', () => {
            return addMockData('/members-t');
        })

        it('Check MemberT Mock Data', () => {
            return checkMockData('/members-t');
        })

        it('Add Workshop Mock Data', () => {
            return addMockData('/workshops');
        })

        it('Check Workshop Mock Data', () => {
            return checkMockData('/workshops');
        })

        // Test begins here
        it('W1-01', () => {
            return w1testFunc(-1, -0.5, 500);
        })

        it('W1-02', () => {
            return w1testFunc(-1, 50, 500);
        })

        it('W1-03', () => {
            return w1testFunc(-1, 100000, 500);
        })

        it('Clean Workshop', () => {
            return request(app.getHttpServer())
                .delete('/workshops/workshop2/delete')
                .expect(200);
        })

        it('Check if Workshop is cleaned', () => {
            return request(app.getHttpServer())
                .get('/workshops')
                .expect(200)
                .expect([]);
        })

        it('Clean MemberT', () => {
            return request(app.getHttpServer())
                .delete('/members-t/owner2/delete')
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
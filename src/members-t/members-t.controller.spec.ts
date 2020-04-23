import { Test, TestingModule } from '@nestjs/testing';
import { MembersTController } from './members-t.controller';
import { MembersTService, MemberTEntityRepository } from './members-t.service';
import * as request from 'supertest';

describe('MembersT Controller', () => {
    let controller: MembersTController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [MembersTController],
        providers: [MembersTService, MemberTEntityRepository],
    }).compile();

        controller = module.get<MembersTController>(MembersTController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

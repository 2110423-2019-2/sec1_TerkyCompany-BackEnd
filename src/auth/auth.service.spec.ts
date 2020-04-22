import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MembersTService, MemberTEntityRepository } from '../members-t/members-t.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, MembersTService, MemberTEntityRepository,
      {
        provide: JwtService,
        useValue: () => ({})
      }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

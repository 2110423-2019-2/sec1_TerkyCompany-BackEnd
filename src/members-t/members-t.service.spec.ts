import { Test, TestingModule } from '@nestjs/testing';
import { MembersTService } from './members-t.service';

describe('MembersTService', () => {
  let service: MembersTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersTService],
    }).compile();

    service = module.get<MembersTService>(MembersTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

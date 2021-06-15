import { Test, TestingModule } from '@nestjs/testing';
import { KeyService } from './key.service';

describe('KeyService', () => {
  let controller: KeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyService],
    }).compile();

    controller = module.get<KeyService>(KeyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

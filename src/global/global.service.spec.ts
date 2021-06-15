import { Test, TestingModule } from '@nestjs/testing';
import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let controller: GlobalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalService],
    }).compile();

    controller = module.get<GlobalService>(GlobalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

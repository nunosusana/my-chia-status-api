import { Test, TestingModule } from '@nestjs/testing';
import { CoinsService } from './coins.service';

describe('CoinsService', () => {
  let controller: CoinsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinsService],
    }).compile();

    controller = module.get<CoinsService>(CoinsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

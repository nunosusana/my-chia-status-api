import { Test, TestingModule } from '@nestjs/testing';
import { FullNodeService } from './full-node.service';

describe('FullNodeService', () => {
  let controller: FullNodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FullNodeService],
    }).compile();

    controller = module.get<FullNodeService>(FullNodeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HarvesterService } from './harvester.service';

describe('HarvesterService', () => {
  let controller: HarvesterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvesterService],
    }).compile();

    controller = module.get<HarvesterService>(HarvesterService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

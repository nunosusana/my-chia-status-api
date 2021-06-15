import { Test, TestingModule } from '@nestjs/testing';
import { FarmerService } from './farmer.service';

describe('FarmerService', () => {
  let controller: FarmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmerService],
    }).compile();

    controller = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

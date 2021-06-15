import { Module } from '@nestjs/common';
import { CoinsController } from './coins.controller';
import { CoinsService } from './coins.service';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService], 
  exports: [CoinsService]
})
export class CoinsModule {}
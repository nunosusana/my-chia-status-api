import { Module } from '@nestjs/common';
import { FullNodeController } from './full-node.controller';
import { FullNodeService } from './full-node.service';

@Module({
  controllers: [FullNodeController],
  providers: [FullNodeService], 
  exports: [FullNodeService]
})
export class FullNodeModule {}
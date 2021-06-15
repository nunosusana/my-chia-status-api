import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalService } from './global/global.service';
import { GlobalController } from './global/global.controller';
import { CoinsController } from './coins/coins.controller';
import { FarmerController } from './farmer/farmer.controller';
import { HarvesterController } from './harvester/harvester.controller';
import { KeyController } from './key/key.controller';
import { WalletController } from './walllet/wallet.controller';
import { CoinsService } from './coins/coins.service';
import { FarmerService } from './farmer/farmer.service';
import { HarvesterService } from './harvester/harvester.service';
import { KeyService } from './key/key.service';
import { WalletService } from './walllet/wallet.service';
import { FullNodeController } from './full-node/full-node.controller';
import { FullNodeService } from './full-node/full-node.service';

@Module({
  imports: [
            ConfigModule.forRoot()
          ],
  controllers: [
                GlobalController, 
                CoinsController, 
                FarmerController,
                HarvesterController,
                KeyController,
                WalletController,
                FullNodeController
              ],
  providers: [
              GlobalService,
              CoinsService,
              FarmerService,
              HarvesterService,
              KeyService,
              WalletService,
              FullNodeService
            ],
})
export class AppModule {}

import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('coins')
@ApiTags('COINS')
export class CoinsController {
    constructor(private readonly coinsService: CoinsService) {}

    @ApiOperation({ description: "Get list of mempool items"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-mempool-items')
    async listPlots()  {
        return await this.coinsService.getAllMempoolItems();
    }

    @ApiOperation({ description: "Get list of mempool tx ids"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-mempool-txids')
    async listPlotsDirectories()  {
        return await this.coinsService.getAllMempoolTxIds();
    }

}


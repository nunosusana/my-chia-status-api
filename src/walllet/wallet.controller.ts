import { Controller, Get, Param, UseGuards, Logger } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('wallet')
@ApiTags('WALLET')
export class WalletController {
    constructor(private readonly walletService: WalletService) {}

    @ApiOperation({ description: "Get wallet balance by wallet id"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-wallet-balance/:id')
    async getWalletBalance(@Param('id') id: number) {
        return await this.walletService.getWalletBalance(id);
    }

    @ApiOperation({ description: "List of wallets"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-wallets')
    async getWallets() {
        return await this.walletService.getWallets();
    }

    @ApiOperation({ description: "List of transactions"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-transactions/:id')
    async getTransactions(@Param('id') id: number) {
        return await this.walletService.getTransactions(id);
    }

}


import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { KeyService } from './key.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('key')
@ApiTags('KEY')
export class KeyController {
    constructor(private readonly keyService: KeyService) {}

    @ApiOperation({ description: "Get all public keys"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-public-keys')
    async getPublicKeys()  {
        return await this.keyService.getPublicKeys();
    }
}


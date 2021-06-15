import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { FullNodeService } from './full-node.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('full-node')
@ApiTags('FULL NODE')
export class FullNodeController {
    constructor(private readonly fullNodeService: FullNodeService
    ) {}

    @ApiOperation({ description: "Get network information"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-network-info')
    async listConnections()  {
        return await this.fullNodeService.getNetworkInfo();
    }

}


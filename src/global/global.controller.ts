import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { GlobalService } from './global.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'; 
import { SetTokenRequest } from './DTO/requests';

@Controller('global')
@ApiTags('GLOBAL')
export class GlobalController {
    constructor(private readonly globalService: GlobalService
    ) {}

    @ApiOperation({ description: "Set new authentication token. Must set this token at the start."})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBody({ type: SetTokenRequest })
    @Post('set-token')
    async setToken(@Body() request: SetTokenRequest) {
        return await this.globalService.setToken(request);
    }

    @ApiOperation({ description: "Get version. Does not work with docker."})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('version')
    async version()  {
        return await this.globalService.version();
    }

}


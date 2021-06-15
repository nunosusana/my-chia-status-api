import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { HarvesterService } from './harvester.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('harvester')
@ApiTags('HARVESTER')
export class HarvesterController {
    constructor(private readonly harvesterService: HarvesterService
    ) {}

    @ApiOperation({ description: "Get list of plots"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('list-plots')
    async listPlots()  {
        return await this.harvesterService.listPlots();
    }

    @ApiOperation({ description: "Get list of plots directories"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('list-plots-directories')
    async listPlotsDirectories()  {
        return await this.harvesterService.listPlotsDirectories();
    }

    @ApiOperation({ description: "Refresh plots"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('refresh-plots')
    async refreshPlots()  {
        return await this.harvesterService.refreshPlots();
    }

    /*
    @ApiOperation({ description: "Get version"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @UseGuards(Authenthicated)
    @Get('test:x')
    async infoPlot(@Param('x') x: string)  {
        return await this.harvesterService.test(x);
    }
 
    @UseGuards(Authenthicated) 
    @Post('test')
    async createPlot(@Body() request) {
        return await this.harvesterService.test(request);
    }
    */
}


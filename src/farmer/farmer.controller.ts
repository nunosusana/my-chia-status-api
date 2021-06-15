import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { Authenthicated } from '../guards/Authenticated';
import { ApiTags, ApiOperation,  ApiOkResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger'; 

@Controller('farmer')
@ApiTags('FARMER')
export class FarmerController{
    constructor(private readonly farmerService: FarmerService) {}

    @ApiOperation({ description: "Get sign age points"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-signage-points')
    async getSignagePoints()  {
        return await this.farmerService.getSignagePoints();
    }

    @ApiOperation({ description: "Get sign age point by id"})
    @ApiNotFoundResponse({ description: "Not found" })
    @ApiOkResponse({ description: "Success" })
    @ApiBearerAuth()
    @UseGuards(Authenthicated)
    @Get('get-signage-point/:id')
    async getSignagePoint(@Param('id') id: number)  {
        Logger.log(`Received id=${id}`)
        return await this.farmerService.getSignagePoint(id);
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CountryService } from "./country.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "../../common/dto/register.dto";
import { CountryDto } from "../../common/dto/country.dto";
import { HotelDto } from "../../common/dto/hotel.dto";

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CountryDto) {
    return await this.countryService.create(data);
  }

  @ApiParam({ name: 'id', type: String, description: 'UUID of the Country' })
  @Get(':id')
  async get(@Param() id: { id: string }) {
    return await this.countryService.get(id);
  }

  @Get()
  async getAll() {
    return await this.countryService.getAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Country' })
  @Patch(':id')
  async update(@Param() id: { id: string }, @Body() data: CountryDto) {
    return await this.countryService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Country' })
  @Delete(':id')
  async delete(@Param() id: { id: string }) {
    return await this.countryService.delete(id);
  }


}

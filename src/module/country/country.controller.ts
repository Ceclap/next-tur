import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CountryService } from "./country.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "../../common/dto/register.dto";
import { CountryDto } from "../../common/dto/country.dto";

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}



  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CountryDto) {
    return await this.countryService.create();
  }
}

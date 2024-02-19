import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CountryDto } from "../../common/dto/country.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HotelService } from "./hotel.service";
import { HotelDto } from "../../common/dto/hotel.dto";

@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {

  constructor(private hotelService: HotelService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: HotelDto) {
    return await this.hotelService.create(data);
  }
}

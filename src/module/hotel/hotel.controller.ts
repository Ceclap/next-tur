import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "../../common/guards/auth.guard";
import { CountryDto } from "../../common/dto/country.dto";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { HotelService } from "./hotel.service";
import { HotelDto } from "../../common/dto/hotel.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUploadDto } from "../../common/dto/imageUpload.dto";
import { UpdateHotelDto } from "../../common/dto/updateHotel.dto";

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

  @Get()
  async getAll() {
    return await this.hotelService.getAll();
  }

  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Get(':id')
  async get(@Param() id: { id: string }) {
    return await this.hotelService.get(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Patch(':id')
  async update(@Param() id: { id: string }, @Body() data: UpdateHotelDto) {
    return await this.hotelService.update(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Delete(':id')
  async delete(@Param() id: { id: string }) {
    return await this.hotelService.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ImageUploadDto,
  })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Post('photo/:id')
  async uploadPhoto(
    @Param() id: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.hotelService.uploadPhoto(file, id);
  }
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ImageUploadDto,
  })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Post('mainPhoto/:id')
  async uploadMainPhoto(
    @Param() id: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.hotelService.uploadMainPhoto(file, id);
  }

  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Get('photo/:id')
  async getPhoto(
    @Param() id: { id: string },
  ) {
    return await this.hotelService.getPhoto(id);
  }
}

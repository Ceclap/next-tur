import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { CountryService } from "./country.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { CountryDto } from "../../common/dto/country.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImageUploadDto } from "../../common/dto/imageUpload.dto";

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
  async getAll(@Query() data: PaginationDto) {
    console.log(data);
    return await this.countryService.getAll(data);
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
    return await this.countryService.uploadPhoto(file, id, 'mainPhoto');
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: ImageUploadDto,
  })
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Post('flagPhoto/:id')
  async uploadFlagPhoto(
    @Param() id: { id: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.countryService.uploadPhoto(file, id, 'flag');
  }

  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Get('photo/:id')
  async getPhoto(
    @Param() id: { id: string },
  ) {
    return await this.countryService.getPhoto(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Country' })
  @Delete(':id')
  async delete(@Param() id: { id: string }) {
    return await this.countryService.delete(id);
  }


}

import { Controller, Delete, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { ImageService } from "./image.service";
import { AuthGuard } from "../../common/guards/auth.guard";

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'UUID of the Profile' })
  @Delete('photo/:id')
  async getPhoto(
    @Param() id: { id: string },
  ) {
    return await this.imageService.deleteImage(id);
  }
}

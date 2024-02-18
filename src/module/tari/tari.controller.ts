import { Controller, Get, UseGuards } from "@nestjs/common";
import { TariService } from "./tari.service";
import { AuthGuard } from "../../common/guards/auth.guard";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

@Controller()
export class TariController {

  constructor(private readonly tariService: TariService) {
  }

  @ApiResponse({
    schema: {
      properties: {
        taskId: {
          type: 'string',
          example: '5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('tari')
  async tari() {
    return this.tariService.tari();
  }
}

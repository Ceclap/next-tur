import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from "../../common/dto/register.dto";
import { LoginDto } from "../../common/dto/login.dto";
import { JwtDto } from "../../common/dto/jwt.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    schema: {
      properties: {
        message: {
          type: 'string',
          example: 'success',
        },
      },
    },
    status: 201,
    description: 'Ok',
  })
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @ApiResponse({
    status: 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f1c2738f-cb47-4911-8585-b7635d94aabd' },
            email: { type: 'string', example: 'victor@gmail.com' },
            username: { type: 'string', example: 'victor' },
          },
        },
      },
    },
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    const payload = await this.authService.login(data)
    console.log(payload);
    return {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
      user: payload.user
    }
  }
  @ApiResponse({
    schema: {
      properties: {
        userId: {
          type: 'string',
          example:'5fb917b8-2b9f-4c8d-a107-c9b7db61da0d',
        },
      },
    },
    status: 200,
    description: 'Ok',
  })
  @Get('confirm/:access_token')
  async profile(@Param() { access_token }: JwtDto) {
    return await this.authService.confirm(access_token)
  }
}

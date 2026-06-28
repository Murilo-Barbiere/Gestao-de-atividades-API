import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthRegiterRequestDto } from './dto/request/auth.register.request.dto';
import { AuthRegiterResponseDto } from './dto/response/auth.register.response.dto';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';
import { PublicRoute } from './decorators/auth.public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('register')
  async register(
    @Body() authRegiterRequestDto: AuthRegiterRequestDto,
  ): Promise<AuthRegiterResponseDto> {
    console.log("1");
    return await this.authService.register(authRegiterRequestDto);
  }

  @PublicRoute()
  @Post('login')
  async login(@Body() authLoginRequestDto: AuthLoginRequestDto) {
    return await this.authService.login(authLoginRequestDto);
  }
}

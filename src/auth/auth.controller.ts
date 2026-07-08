import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthRegisterRequestDto } from './dto/request/auth.register.request.dto';
import { AuthRegisterResponseDto } from './dto/response/auth.register.response.dto';
import { AuthLoginRequestDto } from './dto/request/auth.login.request.dto';
import { PublicRoute } from './decorators/auth.public.decorator';
import { AuthLoginResponseDto } from './dto/response/auth.login.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @Post('register')
  async register(
    @Body() authRegiterRequestDto: AuthRegisterRequestDto): Promise<AuthRegisterResponseDto> {
    return await this.authService.register(authRegiterRequestDto);
  }

  @PublicRoute()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authLoginRequestDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    return await this.authService.login(authLoginRequestDto);
  }
}

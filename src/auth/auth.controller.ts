import { Body, Controller, Get, Post, UseGuards, Request } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthRegiterRequestDto } from "./dto/request/auth.register.request.dto";
import { AuthRegiterResponseDto } from "./dto/response/auth.register.response.dto";
import { AuthLoginRequestDto } from "./dto/request/auth.login.request.dto";
import { JsonWebTokenError } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { PublicRoute } from "./decorators/auth.public.decorator";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @PublicRoute()
    @Post("register")
    async register(@Body() authRegiterRequestDto: AuthRegiterRequestDto): Promise<AuthRegiterResponseDto>{
        return await this.authService.register(authRegiterRequestDto);
    }

    @PublicRoute()
    @Post("login")
    async login(@Body() authLoginRequestDto:AuthLoginRequestDto){
        return await this.authService.login(authLoginRequestDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
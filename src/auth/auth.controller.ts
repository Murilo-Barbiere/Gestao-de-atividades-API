import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthRegiterRequestDto } from "./dto/request/auth.register.request.dto";
import { AuthRegiterResponseDto } from "./dto/response/auth.register.response.dto";
import { AuthLoginRequestDto } from "./dto/request/auth.login.request.dto";
import { JsonWebTokenError } from "@nestjs/jwt";

@Controller("auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("register")
    async register(@Body() authRegiterRequestDto: AuthRegiterRequestDto): Promise<AuthRegiterResponseDto>{
        return await this.authService.register(authRegiterRequestDto);
    }

    @Post("login")
    async login(@Body() authLoginRequestDto:AuthLoginRequestDto){
        return await this.authService.login(authLoginRequestDto);
    }
}
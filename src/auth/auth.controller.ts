import {AuthService} from "./auth.service";
import {Body, Controller, Ip, Post, Req, Request, UseGuards, ValidationPipe} from "@nestjs/common";
import {LocalAuthGuard} from "./local.auth.guard";
import {ApiTags} from "@nestjs/swagger";
import {UserCredentialsDto} from "./dto/user-credentials.dto";
@ApiTags('Auth')
@Controller()
export class AuthController {
        constructor(private readonly authService: AuthService) {}
    @Post('login')
    async singIn(
        @Body(ValidationPipe) authCredentialsDto: UserCredentialsDto,
    ): Promise<{
        token: string;
        userData?: {
            id: number;
            role: string;
            email: string;
        };
    }> {
        return this.authService.login(authCredentialsDto);
    }
}
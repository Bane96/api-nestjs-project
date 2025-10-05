import { AuthService } from "./auth.service";
import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { LocalAuthGuard } from "./local.auth.guard";
import { ApiTags } from "@nestjs/swagger";
import { UserCredentialsDto } from "./dto/user-credentials.dto";

@ApiTags("Auth")
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post("login")
    async singIn(
        @Request() req: any
    ): Promise<{
        token: string;
        user?: {
            id: number;
            role: string;
            email: string;
        };
    }> {
        return this.authService.login(req.user);
    }
}
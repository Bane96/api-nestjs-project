import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";
import {AdminModule} from "../admin/admin.module";
import {UserModule} from '../user/user.module';

@Module({
    imports: [AdminModule, UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIRES_IN,
            }
        })],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, PassportModule, JwtStrategy],
    controllers: [AuthController],
})

export class AuthModule {
}

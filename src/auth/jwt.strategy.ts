import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {JwtPayload} from "./dto/jwtPayload";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {AdminService} from "../admin/admin.service";
import {Admin} from "../entity/admin.entity";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private adminService: AdminService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: JwtPayload): Promise<Admin> {
        const {username, id} = payload;
        const admin = await this.adminService.findByEmail(username);
        if (!admin) {
            throw new UnauthorizedException();
        }
        return admin;
    }
}
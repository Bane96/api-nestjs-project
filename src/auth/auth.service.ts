import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserCredentialsDto} from "./dto/user-credentials.dto";
import {AdminService} from "../admin/admin.service";
import {JwtPayload} from "./dto/jwtPayload";

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService,
    ) {}
    async validateUser(username:string, password: string): Promise<any>{
        const user = await this.adminService.findByEmail(username);

        if (user && user.password === password) {
            const {password, ...rest} = user;
            return user
        }
        return null
        }
        async login(
            dto: UserCredentialsDto,
        ){
            const { username, password } = dto;
            const admin = await this.adminService.findByEmail(username);
            const payload: JwtPayload  = {username: username, id: admin.id}

            return {
                token: this.jwtService.sign(payload),
                userData: admin
            }
        }
}

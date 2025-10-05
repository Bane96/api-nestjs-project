import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from "./dto/user-credentials.dto";
import { AdminService } from "../admin/admin.service";
import { JwtPayload } from "./dto/jwtPayload";

@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.adminService.findByEmail(username);

        if (user && user.password === password) {
            const { password: _password, ...safeUser } = user;
            return safeUser;
        }
        return null;
    }
    async login(
        input: UserCredentialsDto | any,
    ): Promise<{
        token: string;
        user?: {
            id: number;
            role: string;
            email: string;
        };
    }> {
        if (input && !('password' in input && 'username' in input)) {
            const admin = input;
            const payload: JwtPayload = { username: admin.email ?? admin.username, id: admin.id };
            // never return password
            const { password: _password, ...safeAdmin } = admin;
            return {
                token: this.jwtService.sign(payload),
                user: {
                    id: safeAdmin.id,
                    role: safeAdmin.role,
                    email: safeAdmin.email,
                },
            };
        }

        const { username, password } = input as UserCredentialsDto;
        const admin = await this.adminService.findByEmail(username);
        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isValid = admin.password === password;
        if (!isValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username, id: admin.id };
        const { password: _password, ...safeAdmin } = admin;
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: safeAdmin.id,
                role: safeAdmin.role,
                email: safeAdmin.email,
            },
        };
    }
}
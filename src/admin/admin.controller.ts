import {Body, Controller, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {AdminService} from "./admin.service";
import {createAdminDto} from "./dto/CreateAdminDto";

@Controller('admins')
export class AdminController {
    constructor(private adminService: AdminService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    async createUser(@Body() createAdminDto: createAdminDto) {
        return await this.adminService.createAdmin(createAdminDto);
    }
}

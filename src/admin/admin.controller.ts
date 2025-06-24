import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put} from "@nestjs/common";
import {AdminService} from "./admin.service";
import {createAdminDto} from "./dto/CreateAdminDto";
import {CreateUserDto} from '../user/dto/create-user.dto';

@Controller('admins')
export class AdminController {
    constructor(private adminService: AdminService) {
    }
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.adminService.findAll();
    }
    @HttpCode(HttpStatus.OK)
    @Post()
    async createUser(@Body() createAdminDto: createAdminDto) {
        return await this.adminService.createAdmin(createAdminDto);
    }

    @Put(':id')
    async updateUserById(@Param('id') id: number, @Body() updateAdminDto: createAdminDto) {
        return await this.adminService.update(id, updateAdminDto);
    }

    @Delete(':id')
    async  removeUser(@Param('id') id: number) {
        return this.adminService.deleteAccount(id);
    }

}

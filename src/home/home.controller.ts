import {Body, Controller, Get, Param, ParseIntPipe, Post} from "@nestjs/common";
import {HomeService} from "./home.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateHomeDto} from "./dto/home.dto";

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService) {}
    @Get()
    async getHomes() {
            return await this.homeService.findAll();
        }
    @Post()
    async createHome( @Body() createHome: CreateHomeDto) {
            return await this.homeService.createHome(createHome);
        }
}
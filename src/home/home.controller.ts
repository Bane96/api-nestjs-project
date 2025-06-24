import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common";
import {HomeService} from "./home.service";
import {CreateHomeDto} from "./dto/home.dto";
import {IPaginatedResource} from "../common/types/IPaginationResource";
import {Home} from "../entity/home.entity";
import {Pagination, PaginationParams} from "../common/service/pagination.service";
import {Sorting, SortingParams} from "../common/service/sorting.service";
import {IFiltering, FilteringParams} from "../common/service/filter.service";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";

@Controller('home')
@UseGuards(JwtAuthGuard)
export class HomeController {
    constructor(private homeService: HomeService) {
    }

    @Get()
    async getHomes(
        @PaginationParams() paginationParams: Pagination,
        @SortingParams([]) sort?: Sorting,
        @FilteringParams(['name', 'city', 'id']) filter?: IFiltering[]
    ): Promise<IPaginatedResource<Partial<Home>>> {
        return await this.homeService.findAll(paginationParams, filter);
    }

    @Post()
    async createHome(@Body() createHome: CreateHomeDto) {
        return await this.homeService.createHome(createHome);
    }

    @Get(':id')
    async findOneHome(@Param('id') id: string): Promise<Home> {
        return await this.homeService.findOne(+id)
    }

    @Put(':id')
    async updateHomeById(@Param('id') id: number, @Body() updateHomeDto: CreateHomeDto) {
        return await this.homeService.update(id, updateHomeDto)
    }

    @Delete(':id')
    async removeUser(@Param('id', ParseIntPipe) id: number) {
        return this.homeService.remove(id);
    }
}
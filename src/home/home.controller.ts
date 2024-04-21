import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
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
    constructor(private homeService: HomeService) {}
    @Get()
    async getHomes(
        @PaginationParams() paginationParams: Pagination,
        @SortingParams([]) sort?: Sorting,
        @FilteringParams(['name', 'city']) filter?: IFiltering
    ): Promise<IPaginatedResource<Partial<Home>>> {
            return await this.homeService.findAll(paginationParams, filter);
        }
    @Post()
    async createHome( @Body() createHome: CreateHomeDto) {
            return await this.homeService.createHome(createHome);
        }
}
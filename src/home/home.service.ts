import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Home} from "../entity/home.entity";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {ICreateHome} from "./dto/ICreateHome";
import {IPaginatedResource} from "../common/types/IPaginationResource";
import {Pagination} from "../common/service/pagination.service";
import {IFiltering} from "../common/service/filter.service";
import {Sorting} from "../common/service/sorting.service";
import {getOrder, getWhere} from "../common/helpers/typeorm.helper";

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Home) private  homeRepository: Repository<Home>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    async findAll(
        {page, limit, size, offset}: Pagination,
        filter?: IFiltering,
        sort?: Sorting
    ):Promise<IPaginatedResource<Partial<Home>>> {
        const where = getWhere(filter);
        const order = getOrder(sort);
        const [users, total] = await this.homeRepository.findAndCount({
            where,
            order,
            take: size,
            skip: offset,
        });
        return {
            totalItems: total,
            data: users,
            page,
            size
        };
    }
    async createHome (createHome: ICreateHome) {
        // const a = new Home(createHome)
        const newHome = this.homeRepository.create({
            createdAt: new Date(),
            ...createHome
        })
        return await this.homeRepository.save(newHome);
    }
}
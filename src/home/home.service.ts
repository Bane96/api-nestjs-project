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
import {CreateHomeDto} from './dto/home.dto';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Home) private  homeRepository: Repository<Home>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    async findAll(
        {page, limit, size, offset}: Pagination,
        filters?: IFiltering[],
        sort?: Sorting
    ):Promise<IPaginatedResource<Partial<Home>>> {
        const where = filters?.length ? getWhere(filters) : {};
        const order = getOrder(sort);
        const [users, total] = await this.homeRepository.findAndCount({
            where,
            order,
            take: size,
            skip: offset,
            relations:['users']
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

    async findOne(id: number): Promise<Home> {
        return await this.homeRepository.findOne({
            where: { id: id },
            relations: ['users']
        });
    }
    async update(id: number, updateHomeDetails: CreateHomeDto): Promise<Home> {
        await this.homeRepository.update(id, updateHomeDetails);
        return await this.homeRepository.findOne({
            where: { id: id },
            relations: ['users']
        });
    }

        async remove(id: number) {
        return await this.homeRepository.delete({id});
    }
}
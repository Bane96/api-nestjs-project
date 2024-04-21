import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Repository} from 'typeorm';
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Pagination} from "../common/service/pagination.service";
import {IFiltering} from "../common/service/filter.service";
import {IPaginatedResource} from "../common/types/IPaginationResource";
import {getOrder, getWhere} from "../common/helpers/typeorm.helper";
import {Sorting} from "../common/service/sorting.service";
import {Home} from "../entity/home.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        // @InjectRepository(Home) private homeRepository: Repository<Home>,
    ) {
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            createdAt: new Date(),
        });
        return await this.userRepository.save(newUser);
    }

    async findAll(
        {page, limit, size, offset}: Pagination,
        filter?: IFiltering,
        sort?: Sorting
    ): Promise<IPaginatedResource<Partial<User>>> {
        const where = getWhere(filter);
        const order = getOrder(sort);
        const [users, total] = await this.userRepository.findAndCount({
            where,
            order,
            take: size,
            skip: offset,
            relations: ['home']
        });

        return {
            totalItems: total,
            data: users,
            page,
            size
        };
    }

    findOne(userId: number) {
        return this.userRepository.findOne({where: {id: userId}});
    }

   async update(id: number, updateUserDetails: CreateUserDto): Promise<User> {
        await this.userRepository.update(id, updateUserDetails);
        return await this.userRepository.findOne({where: {id: id}})
    }

    remove(id: number) {
        return this.userRepository.delete({id});
    }
}

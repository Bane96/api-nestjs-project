import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Repository} from 'typeorm';
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FilterUserDto} from "./dto/filter-user";
import {Pagination} from "../common/service/pagination.service";
import {Filtering} from "../common/service/filter.service";
import {IPaginatedResource} from "../common/types/IPaginationResource";
import {getOrder, getWhere} from "../common/helpers/typeorm.helper";
import {Sorting} from "../common/service/sorting.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    async createUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create({
            role: UserRoleEnum.USER,
            ...createUserDto,
            createdAt: new Date(),
        });
        return await this.userRepository.save(newUser);
    }

    async findAll(
        {page, limit, size, offset}: Pagination,
        filter?: Filtering,
        sort?: Sorting
    ): Promise<IPaginatedResource<Partial<User>>> {
        const where = getWhere(filter);
        const order = getOrder(sort);
        const [users, total] = await this.userRepository.findAndCount({
            where,
            order,
            take: size,
            skip: offset,
        });

        return {
            totalItems: total,
            items: users,
            page,
            size
        };
    }

    findOne(id: number) {
        return this.userRepository.findBy({id});
    }

    update(id: number, updateUserDetails: UpdateUserDto) {
        return this.userRepository.update({id: id}, {...updateUserDetails});
    }

    remove(id: number) {
        return this.userRepository.delete({id});
    }
}

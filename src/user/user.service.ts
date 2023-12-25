import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Repository} from 'typeorm';
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {UpdateUserDto} from "./dto/update-user.dto";
import {FilterUserDto} from "./dto/filter-user";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      role: UserRoleEnum.USER,
      ...createUserDto,
      createdAt: new Date(),
    });
    return await this.userRepository.save(newUser);
  }

  findAll(
      dto: FilterUserDto
  ): Promise<User[]> {
    return this.userRepository.find({relations: ['homes']});
  }

  findOne(id: number) {
   return this.userRepository.findBy({ id });
  }

  update(id: number, updateUserDetails: UpdateUserDto) {
    return this.userRepository.update({ id: id }, { ...updateUserDetails });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}

import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import {
  IUpdateUserInterface,
  IUserInterface,
} from './interfaces/IUserInterface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
    });
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    this.userRepository.findBy({ id });
  }

  update(id: number, updateUserDetails: IUpdateUserInterface) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}

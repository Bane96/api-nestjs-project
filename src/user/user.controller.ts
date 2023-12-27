import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "../entity/user.entity";
import {Pagination, PaginationParams} from "../common/service/pagination.service";
import {Filtering, FilteringParams} from "../common/service/filter.service";
import {IPaginatedResource} from "../common/types/IPaginationResource";
import {Sorting, SortingParams} from "../common/service/sorting.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'id', 'stateId']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'stateId']) filter?: Filtering
  ): Promise<IPaginatedResource<Partial<User>>> {
    console.log(paginationParams)
    return await this.userService.findAll(paginationParams, filter);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
    async  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}

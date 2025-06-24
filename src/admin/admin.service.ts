import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Admin} from "../entity/admin.entity";
import {Repository} from "typeorm";
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {createAdminDto} from "./dto/CreateAdminDto";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>
    ) {}
    async createAdmin(createUserDto: createAdminDto) {
        const newAdmin = this.adminRepository.create({
            role: UserRoleEnum.VIEWER,
            ...createUserDto,
            createdAt: new Date(),
        });
        return await this.adminRepository.save(newAdmin);
    }

    async findAll() {
        const [result, total] = await this.adminRepository.findAndCount({});
        return {data: result, total: total}
    }
    findOne(id: number) {
        return this.adminRepository.findOne({where: {id: id}});
    }
    async update(id: number, updateDetails: createAdminDto) {
        await this.adminRepository.update(id, updateDetails)
        return this.adminRepository.findOne({where: {id: id}});
    }

    findByEmail(email: string): Promise<Admin | null> {
        return this.adminRepository.findOne({where: {email: email}});
    }
    async deleteAccount(id: number) {
        return await this.adminRepository.delete({id});
    }
}
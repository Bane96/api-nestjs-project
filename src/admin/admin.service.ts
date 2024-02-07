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
            role: UserRoleEnum.ADMIN,
            ...createUserDto,
            createdAt: new Date(),
        });
        return await this.adminRepository.save(newAdmin);
    }
    findOne(id: number) {
        return this.adminRepository.findOne({where: {id: id}});
    }
    findByEmail(email: string) {
        return this.adminRepository.findOne({where: {email: email}});
    }
}
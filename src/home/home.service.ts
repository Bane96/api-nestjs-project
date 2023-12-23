import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Home} from "../entity/home.entity";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {ICreateHome} from "./dto/ICreateHome";

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Home) private  homeRepository: Repository<Home>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
    findAll() {
        return this.homeRepository.find({relations: ['users']});
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
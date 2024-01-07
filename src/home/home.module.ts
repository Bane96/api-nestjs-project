/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import {Home} from "../entity/home.entity";
import {HomeController} from "./home.controller";
import {HomeService} from "./home.service";
import {User} from "../entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Home, User])],
    controllers: [HomeController],
    providers: [HomeService],
})

export class HomeModule {}
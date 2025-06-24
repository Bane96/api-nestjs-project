import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {IsOptional} from 'class-validator';
import {CityEnum} from '../enum/CityEnum';

@Entity({name: 'home'})
export class Home {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: Date;

    @Column({unique: true})
    name: string;

    @Column()
    city: CityEnum;

    @Column()
    @IsOptional()
    street: string;

    @Column()
    @IsOptional()
    streetNumber: string;

    @Column()
    about: string;

    @OneToMany(() => User, (user) => user.home)
    users: User[];
}
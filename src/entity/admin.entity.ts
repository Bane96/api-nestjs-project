import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {Exclude} from "class-transformer";

@Entity({ name: 'admin' })
export class Admin {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.VIEWER})
    role: UserRoleEnum;

    @Column()
    createdAt: Date;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column({ length: 180, unique: true })
    email: string;
}
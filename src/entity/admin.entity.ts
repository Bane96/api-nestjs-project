import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {Exclude} from "class-transformer";
import {IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

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
    @ApiProperty({ required: true })
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @IsOptional()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: `Your password needs to contain a minimum of 8 characters including capital letters, numbers and special symbols like !?%& `,
    })
    password: string;

    @Column({ length: 180, unique: true })
    @ApiProperty({ required: true })
    @IsEmail()
    email: string;
}
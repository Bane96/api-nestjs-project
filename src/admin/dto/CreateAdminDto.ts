import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {UserRoleEnum} from "../../enum/UserRoleEnum";

export class createAdminDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message: `Your password needs to contain a minimum of 8 characters including capital letters, numbers and special symbols like !?%& `,
    })
    password: string;

    @ApiProperty()
    @IsString()
    email: string;

    @IsOptional()
    @ApiProperty()
    role: UserRoleEnum;
}
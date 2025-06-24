import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class CreateHomeDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    about: string;

    @ApiProperty()
    @IsString()
    street: string;

    @ApiProperty()
    @IsString()
    streetNumber: string;

    @ApiProperty()
    @IsString()
    city: string;
}
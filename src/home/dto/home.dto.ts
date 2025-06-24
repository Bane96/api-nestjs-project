import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";
import {CityEnum} from '../../enum/CityEnum';

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
    city: CityEnum;
}
import {IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FilterUserDto {
    @ApiProperty({ required: false })
    @IsOptional()
    firstName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    lastName: string;

    @ApiProperty({ required: false })
    @IsOptional()
    birthdate: string;

    @ApiProperty({ required: false })
    @IsOptional()
    weddingDate: string;

    @ApiProperty({ required: false })
    @IsOptional()
    deadDate: string;

}

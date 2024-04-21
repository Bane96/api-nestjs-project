import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";
import {Home} from "../../entity/home.entity";

export class CreateUserDto {
  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty({pattern: '2021-12-30', example: '2021-12-30'})
  @IsString()
  birthdate: Date;

  @ApiProperty({ pattern: '2021-12-30', example: '2021-12-30' })
  @IsOptional()
  deadDate: Date;

  @ApiProperty({ pattern: '2021-12-30', example: '2021-12-30' })
  @IsOptional()
  weddingDate: Date;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNumber()
  houseNumber: number;

  @ApiProperty()
  @IsString()
  christianGlory: string;

  @ApiProperty()
  @IsString()
  remark: string;

  @ApiProperty()
  @IsOptional()
  home: Home;
}

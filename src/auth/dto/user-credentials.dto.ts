import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCredentialsDto {
  @ApiProperty({ default: 'Bane96' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  username: string;

  @ApiProperty({ default: 'Bane12345!' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  password: string;
}

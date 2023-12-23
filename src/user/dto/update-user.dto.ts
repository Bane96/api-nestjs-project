import {Home} from "../../entity/home.entity";

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  birthdate: Date;
  password: string;
  deadDate: Date;
  weddingDate: Date;
  gender: string;
  city: string;
  homeNumber: number;
  christianGlory: string;
  remark: string;
  home: Home;
}

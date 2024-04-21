import {Home} from "../../entity/home.entity";

export class UpdateUserDto {
  firstName: string;
  lastName: string;
  birthdate: string;
  deadDate: string;
  weddingDate: string;
  gender: string;
  city: string;
  houseNumber: number;
  christianGlory: string;
  remark: string;
  home: Home;
}

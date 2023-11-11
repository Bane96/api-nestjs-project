import { UserRoleEnum } from "../../enum/UserRoleEnum";

export class CreateUserDto {
  role: UserRoleEnum;
  firstName: string;
  lastName: string;
  birthdate: string;
  password: string;
  gender: string;
  city: string;
  deadDate: string;
  weddingDate: string;
}

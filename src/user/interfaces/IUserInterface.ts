import { UserRoleEnum } from "../../enum/UserRoleEnum";

export interface IUserInterface {
  firstName: string;
  lastName: string;
  password: string;
  birthdate: string;
  role: UserRoleEnum;
  gender: string;
  city: string;
  deadDate: string;
  weddingDate: string;
}

export interface IUpdateUserInterface {
  firstName: string;
  lastName: string;
  birthdate: string;
}

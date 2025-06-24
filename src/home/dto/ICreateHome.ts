import {CityEnum} from '../../enum/CityEnum';

export interface ICreateHome {
    name: string;
    city: CityEnum;
    about: string;
    streetNumber: string;
    street: string;
}
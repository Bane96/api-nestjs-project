import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {JoinColumn} from "typeorm/browser";

@Entity({name: 'home'})
export class Home {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createdAt: Date;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    about: string;

    @OneToMany(() => User, (user) => user.home)
    users: User[];
}
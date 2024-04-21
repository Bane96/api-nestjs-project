import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Home} from "./home.entity";
import {Exclude} from "class-transformer";

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  deadDate: Date;

  @Column({ nullable: true })
  weddingDate: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  city: string;

  @Column({nullable: true})
  houseNumber: number;

  @Column({nullable: true})
  christianGlory: string;

  @Column({nullable: true})
  remark: string;

  @ManyToOne(() => Home, (home) => home.users)
  home: Home
}

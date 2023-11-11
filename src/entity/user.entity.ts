import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../enum/UserRoleEnum';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @Column({ nullable: true })
  password: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  deadDate: Date;

  @Column({ nullable: true })
  weddingDate: Date;
}

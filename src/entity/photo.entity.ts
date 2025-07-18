import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'photos' })
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column({ nullable: true })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.id, { nullable: true, onDelete: 'SET NULL' })
    user: User;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from "typeorm";
import { Task } from "./Task";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    passwordSalt: string;

    @Index()
    @OneToMany(() => Task, (task) => Task)
    tasks: Task[];

}

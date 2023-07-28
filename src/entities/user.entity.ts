import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Task } from "./task.entity";


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

    @OneToMany(() => Task, (task) => Task)
    tasks: Task[];

}

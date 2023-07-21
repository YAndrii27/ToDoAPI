import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import { Task } from "./Task";

@Entity()
export class Account {
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

    @OneToMany(() => Task, (task) => Task.owner)
    tasks: Task[];

}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { User } from "./user.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0)), type: "text" })
  expiration: string;

}

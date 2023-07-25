import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { User } from "./User.";

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

  @Column({ nullable: true, default: Date(), type: "text" })
  expiration: string;

}

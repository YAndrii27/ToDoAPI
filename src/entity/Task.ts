import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

import { Account } from "./Account";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (pwner) => Account.tasks)
  owner: Account;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: Date(), type: "text" })
  expiration: string;

}

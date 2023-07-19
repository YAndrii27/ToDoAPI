import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerID: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: Date(), type: "text" })
  expiration: string;

}

import { Entity, PrimaryColumn, Column, ManyToOne, Index } from "typeorm"

import { Account } from "./User";

@Entity()
export class Session {
    @PrimaryColumn('varchar', { length: 64 })
    sessionId: string;

    @Index()
    @ManyToOne(() => Account)
    account: Account;

    @Column({ nullable: true, default: Date.now() })
    creationTimestamp: number;

    @Column({ nullable: true, default: Date.now() })
    lastAccessedTimestamp: number;

    @Column()
    lastIPAccessed: string;

    @Column({ nullable: true, default: Date.now() + 1*1000*86400 })
    deleteAt: number;

}
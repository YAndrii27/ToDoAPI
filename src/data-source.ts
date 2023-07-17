import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "tasks.sql",
    synchronize: true,
    logging: true,
    entities: [Task],
    migrations: [],
    subscribers: [],
})

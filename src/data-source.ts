import "reflect-metadata"
import { DataSource } from "typeorm"
import { Task } from "./entity/Task"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "tasks.db",
    synchronize: true,
    logging: true,
    entities: [Task],
    migrations: [],
    subscribers: [],
})

import { DataSource } from "typeorm"
import { env } from "process"

import { Task } from "../entities/task.entity"
import { User } from "../entities/user.entity"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Task],
  migrations: ["../migrations/*.ts"],
})
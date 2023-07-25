import { env } from "process"

import "reflect-metadata"
import { DataSource } from "typeorm"

import { Task } from "../entities/Task"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Task],
  migrations: ["../migrations/*.ts"],
})

AppDataSource.initialize()
	.then(() => {
		console.log("Data source initialized");
	})
	.catch((e: Error) => {
		console.error("Error during initialization ", e);
	})
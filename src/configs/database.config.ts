import { DataSource } from "typeorm";

import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Task],
  migrations: ["../migrations/*.ts"],
})

export async function initializeAppDataSource() {
  await AppDataSource.initialize()
	.then(() => {
		console.log("Data source initialized");
	})
	.catch((e: Error) => {
		console.error("Error during initialization ", e);
	})
}
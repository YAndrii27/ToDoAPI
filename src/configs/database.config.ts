import { DataSource } from "typeorm";

import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
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
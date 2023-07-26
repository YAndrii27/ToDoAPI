import express from 'express';
import cors from 'cors';
import path from 'path';
import { env } from 'process';

import { loadDotenv } from './configs/env.config';
import { AppDataSource } from './configs/database.config';
import { authMiddleware } from './middlewares/auth.middleware';

import TaskRoute from './routes/task.route';
import UserRoute from './routes/user.route';

const app = express();
loadDotenv();

app.set('views', path.join(__dirname, "..", "views"));
app.set('view engine', 'pug');
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "static")));

app.use("/task", authMiddleware, TaskRoute);
app.use("/user", UserRoute);

(async () => {
  await AppDataSource.initialize()
	.then(() => {
		console.log("Data source initialized");
	})
	.catch((e: Error) => {
		console.error("Error during initialization ", e);
	})
});

app.listen(Number(env.PORT), env.HOST, () => {
  return console.log(`Server is listening at http://${env.HOST}:${env.PORT}`);
});
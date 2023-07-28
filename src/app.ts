import "reflect-metadata";
import express from 'express';
import rateLimit from 'express-rate-limit';

import cors from 'cors';
import path from 'path';

import { loadDotenv } from './configs/env.config';
loadDotenv();

import { initializeAppDataSource } from './configs/database.config';
import { authMiddleware } from './middlewares/auth.middleware';

import TaskRoute from './routes/task.route';
import UserRoute from './routes/user.route';

const app = express();
const limiter = rateLimit({windowMs: 1*60*1000, max: 40});

app.set('views', path.join(__dirname, "..", "views"));
app.set('view engine', 'pug');
app.use(cors());
app.use(limiter);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "static")));

app.use("/task", authMiddleware, TaskRoute);
app.use("/user", UserRoute);

app.listen(Number(process.env.PORT), process.env.HOST, async () => {
	await initializeAppDataSource();
	return console.log(`Server is listening at http://${process.env.HOST}:${process.env.PORT}`);
}); 
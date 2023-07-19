import express from 'express';
import cors from 'cors';
import path from 'path';

import { AppDataSource } from "./data-source"
import SaveTask from './handlers/SaveTask'
import ReadTask from './handlers/ReadTask';

AppDataSource.initialize();

const app = express();
const host = "127.0.0.1";
const port = 3000;

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

app.use('/task', [SaveTask, ReadTask]);

app.listen(port, host, () => {
  return console.log(`Server is listening at http://${host}:${port}`);
});
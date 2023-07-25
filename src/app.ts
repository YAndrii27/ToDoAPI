import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import path from 'path';

import SaveTask from './handlers/tasks/SaveTask'
import ReadTask from './handlers/tasks/ReadTask';

import Auth from './handlers/accounts/Auth';

import { preCheckJSON } from './middlewares/pre';

const app = express();
const host = "127.0.0.1";
const port = 3000;

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(preCheckJSON);

app.use(express.static(path.join(__dirname, "static")));

app.use('/task', [SaveTask, ReadTask]);
app.use('/account', [Auth])

app.listen(port, host, () => {
  return console.log(`Server is listening at http://${host}:${port}`);
});
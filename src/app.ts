import express from 'express';

import { AppDataSource } from "./data-source"
import SaveTask from './handlers/SaveTask'

AppDataSource.initialize();

const app = express();
const host = "127.0.0.1";
const port = 3000;

app.use(express.json())
//app.use(express.urlencoded({extended: true}));

app.use('/tasks', SaveTask);

app.listen(port, host, () => {
  return console.log(`Server is listening at http://${host}:${port}`);
});
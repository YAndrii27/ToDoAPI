import express, { Request, Response } from 'express';

import { TaskController } from '../controllers/task.controller';

const router = express.Router();
const taskController = new TaskController();

async function readTaskHandler(req: Request, res: Response) {
  try {
    await taskController.getTask(req, res);
  } catch (error) {
    console.error("Error during reading task: ", error);
    res.status(500).json({Message: "Internal error during reading task"});
  }
}

async function readAllTaskHandler(req: Request, res: Response) {
  try {
    await taskController.getAllTaskByOwner(req, res);
  } catch (error) {
    console.error("Error during reading tasks: ", error);
    res.status(500).json({Message: "Internal error during reading tasks"});
  }
}

async function saveTaskHandler(req: Request, res: Response) {
  try {
    await taskController.createTask(req, res);
  } catch (error) {
    console.error("Error during saving task: ", error);
    res.status(500).json({Message: "Internal error during saving task"});
  }
}

router.get("/", async (req: Request, res: Response) => {
  res.render("task_list.pug");
});

router.post("/read", readTaskHandler);

router.post("/read-all", readAllTaskHandler);

router.post('/save', saveTaskHandler);

export default router;
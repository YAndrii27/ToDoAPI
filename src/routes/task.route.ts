import express, { Request, Response } from 'express';

import { TaskController } from '../controllers/task.controller';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
import { AppDataSource } from '../configs/database.config';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

const router = express.Router();

const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository);
const taskService = new TaskService(taskRepository, userService)
const taskController = new TaskController(taskService);

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

router.post("/read", readTaskHandler);

router.post("/read-all", readAllTaskHandler);

router.post('/save', saveTaskHandler);

export default router;
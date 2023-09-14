import cron from "node-cron";

import { TaskService } from "../services/task.service";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../configs/database.config";
import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";

const taskRepository = AppDataSource.getRepository(Task);
const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository);
const service = new TaskService(taskRepository, userService);

export function clearTasks() {
  cron.schedule("*/10 * * * *", async () => {
    try {
      const tasks = await service.readAllTasks();
      tasks.forEach(async (task: Task) => {
        const now = Date.now();
        const parsedTime = Date.parse(task.expiration);
        if (now >= parsedTime) {
          await service.deleteTask(task.id);
          console.log("Removed task ", task.id, " because it's expired");
        }
      })
    } catch (error) {
      console.error(error.message);
    }
  })
}
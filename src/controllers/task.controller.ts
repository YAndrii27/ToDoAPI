import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { Task } from "../entities/task.entity";

export class TaskController {

  private taskService: TaskService;

  constructor(service: TaskService) {
    this.taskService = service;
  }

  async createTask(req: Request, res: Response) {
    const body = req.body;
    const task = await this.taskService.create(body.title, body.description, body.expiration, body.owner);
    res.status(201).json(task);
  }

  async getTask(req: Request, res: Response) {
    const task = await this.taskService.readTask(req.body.id);
    res.status(200).json(task);
  }

  async getAllTaskByOwner(req: Request, res: Response): Promise<void> {
    const ownerLoginOrId = req.body.login ?? req.body.owner_id;
    console.log(ownerLoginOrId);
    const task_list: Task[] = await this.taskService.readAllTaskByOwner(ownerLoginOrId);
    res.status(200).json(task_list);
  }

  async updateTask(req: Request, res: Response) {
    const task = await this.taskService.updateTask(req.body);
    res.status(200).json(task);
  }

  async deleteTask(req: Request, res: Response) {
    await this.taskService.deleteTask(req.body);
    res.status(204);
  }

}
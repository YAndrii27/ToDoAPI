import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

class TaskController {

    constructor (private taskService: TaskService) {}

    async createTask(req: Request, res: Response) {
        const body = req.body;
        const task = await this.taskService.create(body.title, body.description, body.expiration, body.owner);
        res.status(201).json(task);
    }

    async getTask(req: Request, res: Response) {
        const task = await this.taskService.readTask(req.body.id);
        res.status(200).json(task);
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
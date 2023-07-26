import { Repository } from 'typeorm';

import { AppDataSource } from '../configs/database.config';
import { Task } from '../entities/task.entity';
import { UserService } from './user.service';

export class TaskService {

	private taskRepository: Repository<Task>;
  private userService: UserService

	constructor() {
		this.taskRepository = AppDataSource.getRepository(Task);
    this.userService = new UserService();
	}

  async create(title: string, description: string, expiration: string, ownerLogin: string) : Promise<Task> {
    const task: Task = new Task();

    task.title = title;
    task.description = description;
    task.expiration = expiration;
    task.owner = await this.userService.getUser(ownerLogin);
    await this.taskRepository.save(task);

    return task
  }

  async readTask(taskId: number) : Promise<Task> {
    const task: Task = await this.taskRepository.findOneBy({ id: taskId });
    return task
  }

  async readAllTaskByOwner(ownerLogin: string): Promise<Task[]>;
  async readAllTaskByOwner(ownerId: number): Promise<Task[]>;
  async readAllTaskByOwner(ownerLoginOrId: string | number) : Promise<Task[]> {
    if (typeof ownerLoginOrId === "string") {
      const tasks: Task[] = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owner', 'owner')
      .where('owner.login = :ownerLogin', { ownerLoginOrId })
      .getMany();
      return tasks;
    } else {
      const tasks: Task[] = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.owner', 'owner')
      .where('owner.id = :ownerId', { ownerLoginOrId })
      .getMany();
      return tasks;
    }
  }

  async updateTask(data) : Promise<Task> {
    const task: Task = await this.readTask(data.id);

    const updatedTask = Object.assign(task, data)
    updatedTask.owner = await this.userService.getUser(data.ownerId) ?? task.owner

    await this.taskRepository.save(updatedTask);

    return task;
  }

  async deleteTask(taskId: number) : Promise<void> {
    const task: Task = await this.readTask(taskId);
    await this.taskRepository.remove(task);
    return;
  }

}
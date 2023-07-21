import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);

export async function readTask(task_id: number) : Promise<Task> {
	/**
	 * Reads the task from a database
   * 
   * @param task_id - task unique ID
   * 
   * @returns Task object
   */
  const taskRepository: Repository<Task> = AppDataSource.getRepository(Task);
  const task: Task = await taskRepository.findOneBy({ id: task_id });
  return task;
}

export async function readAllTasks(ownerID: number) : Promise<Task[]> {
  /**
   * Gets all tasks for the provided owner ID
   * 
   * @param ownerID - The ID of the owner to get tasks for
   * 
   * @returns Array of Task objects belonging to the owner
   */
  const tasks: Task[] = await taskRepository.find({
		relations: { owner: true },
    where: { owner: { id: ownerID } }
  });
  return tasks;
}
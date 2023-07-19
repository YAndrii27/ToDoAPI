import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export async function readTask(task_id: number) : Promise<Task> {
    /**
     * Reads the task from a database
     * 
     * @param task_id - task unique ID
     * 
     * @returns Task object
     */
    const taskRepository = AppDataSource.getRepository(Task);
    const task = await taskRepository.findOneBy({ id: task_id });
    return task;
}

export async function readAllTasks(ownerID: number) {
    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find({ where: { ownerID: ownerID } });
    return tasks;
}
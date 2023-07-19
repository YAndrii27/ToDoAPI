import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export async function saveTask(
  title: string,
  description: string,
  ownerID: number,
  expiration?: string
): Promise<number> {
  /**
   * Saves a task with the provided details.
   *
   * @param title  - Task title.
   * @param description - Task description.
   * @param ownerID - Task owner's unique ID.
   * @param [expiration] - Date of task expiration.
   *                            Equal to today's date if the task has no expiration date (optional).
   *
   * @returns The newly created task ID as a number.
   */
  const task = new Task();
  task.title = title;
  task.description = description;
  task.ownerID = ownerID;
  if (expiration) {
    task.expiration = expiration;
  }

  await AppDataSource.manager.save(task).catch(e => {
    console.error(e);
  });
    
  return task.id;
}

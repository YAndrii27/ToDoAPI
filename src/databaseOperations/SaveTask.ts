import { AppDataSource } from '../data-source';
import { Task } from '../entity/Task';

export async function SaveTask(
        title: string,
        description: string,
        ownerID: number,
        expiration: Date
    ) : Promise<number> {
            const task = new Task();
            task.title = title;
            task.description = description;
            task.ownerID = ownerID;
            task.expiration = expiration;
            await AppDataSource.manager.save(task).catch(e => {console.log(e)});
            return task.id;
}
import express, { Request, Response } from 'express';
import { readAllTasks, readTask } from '../typeorm-operations/ReadTask';

const router = express.Router();

router.post("/read", async (req: Request, res: Response) => {
    const body = req.body;
    if (typeof body.task_id === 'undefined') {
      res.status(401).json({ error: 'Missed key in JSON request' });
      return;
    }

    const task = await readTask(body.task_id);
    
    res.status(200).json({ 
        task_id: task.id, 
        owner_id: task.ownerID,
        title: task.title,
        description: task.description,
        expriration: task.expiration
    });
});

router.post("/read-all", async (req: Request, res: Response) => {
    const data = req.body.owner_id.ownerID;
    if (typeof data === 'undefined') {
      res.status(401).json({ error: 'Missed key in JSON request' });
      return;
    }

    console.log(data);

    const tasks = await readAllTasks(data.ownerID);

    res.status(200).json(tasks);

})

router.get("/", async (req: Request, res: Response) => {
    res.render("task_list.pug");
});

export default router;
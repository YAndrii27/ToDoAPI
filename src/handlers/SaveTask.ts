import express, { Request, Response } from 'express';
import { saveTask } from '../typeorm-operations/SaveTask';

const router = express.Router();

router.post('/save', async (req: Request, res: Response) => {
  const body = req.body;
  if (typeof body.owner_id === 'undefined') {
    res.status(401).json({ error: 'Missed key in JSON request' });
    return;
  }

  const taskID = await saveTask(
    body.title,
    body.description,
    body.owner_id,
    body.expiration
  );

  res.status(200).json({ task_id: taskID });
});

export default router;
import { Router } from 'express';

import { SaveTask, ReadTask } from './handlers/tasks';
import { preCheckJSON } from './middlewares/pre';

const router = Router();

router.use(preCheckJSON);

router.use('/tasks', [SaveTask, ReadTask]);

export default router;
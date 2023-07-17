import express from 'express';

import { SaveTask } from '../databaseOperations/SaveTask'

const router = express.Router();

router.post("/save", async (req, res) => {
    const body = req.body;
    if (typeof(body.owner_id) == "undefined") {
        res.statusCode = 401;
        res.json({"error": "Missed key in JSON request"});
        res.end();
        return;
    }
    const taskID = await SaveTask(
        body.title,
        body.description,
        body.owner_id,
        body.expiration
    );
    res.statusCode = 200;
    res.json({"task_id": taskID});
    res.end();
    return;
})

export default router;
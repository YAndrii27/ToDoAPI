import {Request, Response} from "express";

export async function preCheckJSON(req: Request, res: Response, next: CallableFunction) {
    const body = req.body;

    const check_keys: string | undefined = body.login ?? body.password_hash ?? body.email ?? body.password_salt;

    if (check_keys) {
        next();
        return;
    }

    res.status(401).json({ error: "Missed key in JSON data"});
    return;
}
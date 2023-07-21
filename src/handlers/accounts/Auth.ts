import express, {Request, Response} from "express";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
    const body = req.body;
    if (typeof body.password_hash === "undefined") {
      res.status(401).json({ error: 'Missed key in JSON request' });
      return;
    }

    const Account = "";

});
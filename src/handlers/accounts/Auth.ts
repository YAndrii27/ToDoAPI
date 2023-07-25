import express, {Request, Response} from "express";

import { attemptSignUp, generateSession, getSalt, validateAuthData } from "../../typeorm-operations/Auth";

const router = express.Router()

router.post("/login", async (req: Request, res: Response) => {
  const body = req.body;
  const checkAuthData = await validateAuthData(body.login, body.password_hash);

  if (checkAuthData) {
    res
    .status(200)
    .cookie("session", await generateSession(body.login, req.ip, body.delete_at))
    .json({ success: "Loggined in" });
    return;
  }

  res.status(401).json({ error: "Incorrect auth data" });

});

router.post("/salt", async (req: Request, res: Response) => {
  const body = req.body;

  const salt = await getSalt(body.login);

  res.status(200).json({ salt: salt });

})

router.post("/register", async (req: Request, res: Response) => {
  const body = req.body;
  const signUp = await attemptSignUp(body.login, body.email, body.password_hash, body.password_salt)

  if (signUp) {
    res
    .status(200)
    .json({ success: "Signed up succesfully" })
    .cookie("session", await generateSession(body.login, req.ip))
    return;
  }

  res.status(400).json({ error: "Incorrect auth data" });

})

export default router;
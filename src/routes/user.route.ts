import express, {Request, Response} from "express";

import { UsersController } from "../controllers/user.controller";

const router = express.Router();
const userController = new UsersController();

async function loginHandler(req: Request, res: Response) {
  try {
    await userController.login(req, res);
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({Message: "Internal error during login"});
  }
}

async function registerHandler(req: Request, res: Response) {
  try {
    await userController.register(req, res);
  } catch (error) {
    console.error("Error during login: ", error);
    res.status(500).json({Message: "Internal error during login"});
  }
}

router.post("/login", loginHandler);

router.post("/register", registerHandler);

export default router;
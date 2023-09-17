import express, {Request, Response} from "express";

import { UsersController } from "../controllers/user.controller";
import { AppDataSource } from '../configs/database.config';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User)
const userService = new UserService(userRepository);
const userController = new UsersController(userService);

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
    res.status(500).json({Message: "Internal error during register"});
  }
}

router.post("/login", loginHandler);

router.post("/register", registerHandler);

export default router;
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

router.get("/login", async (req: Request, res: Response) => {
  res.render("login.pug")
});

router.get("/register", async (req: Request, res: Response) => {
  res.render("register.pug");
});

router.post("/login", loginHandler);

router.post("/register", registerHandler);

router.get("/", async (req: Request, res: Response) => {
  const authTokenCookie: string | undefined = req.cookies['authToken'];

  if (authTokenCookie) {
    // If the authorization token cookie is present, redirect to task list
    res.redirect('../task/');
  } else {
    // If the authorization token cookie is not present, redirect to login page
    res.redirect('/user/register');
  }
});

export default router;
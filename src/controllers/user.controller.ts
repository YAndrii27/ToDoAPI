import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

export class UsersController {

  private userService: UserService

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    const body = req.body;
    console.log(body);
    const user = await this.userService.register(body.login, body.email, body.password);
    const token = sign({ userId: user.id }, env.SECRET_KEY, {
      expiresIn: '4h',
    });
    res.status(201).json({user, token});
  }

  async login(req: Request, res: Response) {
    const user = await this.userService.login(req.body.login, req.body.password);
    if (user) {
      const token = sign({ userId: user.id }, env.SECRET_KEY, {
        expiresIn: '4h',
      });
      res.status(200).json({user, token});
      return;
    }
    res.status(401).json({message: "Incorrect login or password"})
  }

  async getUser(req: Request, res: Response) {
    const user = await this.userService.getUser(req.body);
    res.json(user)
  }

  async updateUser(req: Request, res: Response) {
    const user = await this.userService.updateUser(req.body);
    res.json(user);
  }

  async deleteUser(req: Request, res: Response) {
    const user = await this.userService.deleteUser(req.body);
    res.json(user);
  }

}

export default UsersController;
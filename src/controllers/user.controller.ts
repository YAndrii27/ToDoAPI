import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

class UsersController {

  constructor(private userService: UserService) {}

  async register(req: Request, res: Response) {
    const body = req.body;
    const user = await this.userService.register(body.login, body.email, body.passwordHash, body.passwordSalt);
    const token = sign({ userId: user.id }, env.SECRET_KEY, {
      expiresIn: '4h',
    });
    res.status(201).json({user, token});
  }

  async login(req: Request, res: Response) {
    const user = await this.userService.login(req.body);
    const token = sign({ userId: user.id }, env.SECRET_KEY, {
      expiresIn: '4h',
    });
    res.status(200).json({user, token});
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
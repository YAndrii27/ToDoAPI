import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from 'process';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    const decodedToken = verify(token, env.SECRET_KEY) as { userId: number };

    req.body.userId = decodedToken.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

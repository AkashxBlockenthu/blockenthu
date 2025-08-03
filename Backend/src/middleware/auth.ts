import { Request, Response, NextFunction } from 'express';
import appConfig from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    console.error('No or invalid Authorization header');
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf8');
  const [username, password] = token.split(':');

  // Trim whitespace
  const trimmedPassword = password.trim();
  const trimmedKeys = appConfig.sharedApiKeys.map(key => key.trim());

  if (!trimmedKeys.includes(trimmedPassword) || username) {
    console.error('Invalid password after trimming:', trimmedPassword);
    res.status(403).json({ error: 'Something went wrong, try again or contact POC' });
    return;
  }

  next();
}; 
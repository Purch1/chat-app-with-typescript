import { Request, Response, NextFunction } from 'express';

export function handleInvalidRoutes(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ error: 'not found' });
}

import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        // Verify token logic here
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

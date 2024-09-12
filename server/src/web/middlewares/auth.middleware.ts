import { IUser } from '@src/contract/interfaces/IUserService';
import { UnauthorizedException } from '@src/core/exceptions';
import { UserRepository } from '@src/infrastructure/repositories/UserRepository';
import { JWTService } from '@src/infrastructure/utils/token.util';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
// Assuming you have a User type defined somewhere

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId; 
        
      }; 
    }
  }
}

/**
 * Authentication middleware
 */
export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException({ message: 'No Token Provided' });
  }

  const [scheme, extractedToken] = authHeader.split(' ');

  if (scheme.toLowerCase() !== 'bearer') {
    throw new UnauthorizedException({ message: 'Invalid Token Provided' });
  }

  if (!extractedToken) {
    throw new UnauthorizedException({ message: 'No Token Provided' });
  }

  const decoded = JWTService.decodeToken(extractedToken) as JwtPayload | null;
  if (!decoded) {
    throw new UnauthorizedException({ message: 'Invalid or expired token.' });
  }

  const user = await UserRepository.findById(decoded.id);

  if (!user) {
    throw new UnauthorizedException({ message: 'User not found' });
  }

  req.user = user;

  return next();
}

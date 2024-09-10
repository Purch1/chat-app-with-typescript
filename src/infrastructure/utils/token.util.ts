import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import logger from '../logger/logger';

export interface Token extends EncodedData {
  expiresIn: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface EncodedData {
  id?: Types.ObjectId;
}

export class JWTService {
  /**
   * Generates an access token with the provided data and optional duration.
   * 
   * @param data - Data to encode in the token (id, etc.).
   * @param duration - Optional custom token duration in seconds.
   * @returns Token data (token and expiry time).
   */
  static generateAccessToken(data: EncodedData, duration?: number): TokenData {
    const expiresIn = duration || parseInt(process.env.ACCESS_TOKEN_TTL || '86400'); // Default is 1 day
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

    const token = jwt.sign(data, jwtSecret, { expiresIn });
    
    return { token, expiresIn };
  }

  /**
   * Generates a refresh token with the provided data and optional duration.
   * 
   * @param data - Data to encode in the token (id, etc.).
   * @param duration - Optional custom token duration in seconds.
   * @returns Token data (token and expiry time).
   */
  static generateRefreshToken(data: EncodedData, duration?: number): TokenData {
    const expiresIn = duration || parseInt(process.env.REFRESH_TOKEN_TTL || '604800'); // Default is 7 days
    const jwtSecret = process.env.JWT_SECRET as jwt.Secret;

    const token = jwt.sign(data, jwtSecret, { expiresIn });
    
    return { token, expiresIn };
  }

  /**
   * Decodes and verifies the provided token.
   * 
   * @param token - The token string to decode.
   * @returns Decoded token data or null if invalid.
   */
  static decodeToken(token: string): Token | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as Token;
    } catch (error: any) {
      logger.debug(`JWT verification failed: ${error.message}`);
      return null;
    }
  }
}

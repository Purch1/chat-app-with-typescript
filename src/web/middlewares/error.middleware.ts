import { ApiException, ConflictException, ServerException } from '@src/core/exceptions';
import logger from '@src/infrastructure/logger/logger';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Error handling middleware for handling various types of errors in an Express application.
 *
 * @param {Error | ApiException} error - The error object, which can be a standard error, ApiException, or ServerException.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 * @returns
 */
export function errorHandlingMiddleware(
  error: Error | ApiException | ServerException,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  // Handle JSON syntax errors
  if (error instanceof SyntaxError && 'body' in error) {
    const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, error);
    return res.status(400).json(response);
  }

  // Handle custom server exceptions
  if (error instanceof ServerException) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
      if (error.innerException) {
        logger.error(error.innerException.message, error.innerException.stack);
      }
    }
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  // Handle custom API exceptions
  if (error instanceof ApiException) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
    const response = BaseHttpResponse.failed(error.message, error.errors);
    return res.status(error.status).json(response);
  }

  // Handle custom conflict exceptions
  if (error instanceof ConflictException) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error.message);
    }
    const response = BaseHttpResponse.failed(error.errors);
    return res.status(error.status).json(response);
  }

  // Handle generic errors
  if (error instanceof Error) {
    if (process.env.NODE_ENV === 'development') {
      logger.error(error.message, error.stack);
      console.error(error.message, error.stack);
    }
    const response = BaseHttpResponse.failed('Something went wrong');
    return res.status(500).json(response);
  }

  return next();
}

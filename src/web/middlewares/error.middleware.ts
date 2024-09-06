import { Request, Response, NextFunction } from 'express';
import logger from '@src/infrastructure/logger/logger';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { ConflictException, ServerException } from '@src/core/exceptions';
import { ApiException } from '@src/core/exceptions/ApiException';


export function errorMiddleware(
  error: Error | BaseHttpResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof SyntaxError && 'body' in error) {
    const response = BaseHttpResponse.failed(`Error parsing JSON: ${error.message}`, { path: req.path, error });
    return res.status(400).json(response);
  }

  if (error instanceof ServerException) {
    logger.error(`ServerException: ${error.message}`, { stack: error.innerException?.stack, path: req.path });
    const response = BaseHttpResponse.failed(error.message, { path: req.path, error });
    return res.status(error.status).json(response);
  }

  if (error instanceof ConflictException) {
    const response = BaseHttpResponse.failed(error.message, { path: req.path, errors: error.errors });
    return res.status(error.status).json(response);
  }

  if (error instanceof ApiException) {
    const response = BaseHttpResponse.failed(error.message, { path: req.path, error });
    return res.status(error.status).json(response);
  }

  if (error instanceof Error) {
    logger.error(`Unhandled Error: ${error.message}`, { stack: error.stack, path: req.path });
    const response = BaseHttpResponse.failed('An unexpected error occurred', { path: req.path, error });
    return res.status(500).json(response);
  }

  return next(error);
}

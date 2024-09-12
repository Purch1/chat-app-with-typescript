import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function validateRequest(schema: z.ZodObject<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const validationError = fromZodError(result.error, { prefix: null });

      const errors = validationError.toString().replace(/"/g, "'").split('; ');

      const response = BaseHttpResponse.failed('validation error', errors);

      return res.status(422).json(response);
    } else {
      req.query = result.data.query;
      req.params = result.data.params;
      req.body = result.data.body;
      return next();
    }
  };
}

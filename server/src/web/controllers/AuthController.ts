import { AuthService } from '@src/core/services/AuthService';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { Request, Response } from 'express';

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const { message, data } = await AuthService.register(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static login = async (req: Request, res: Response) => {
    const { message, data } = await AuthService.login(req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}

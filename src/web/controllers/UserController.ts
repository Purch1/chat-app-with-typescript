import { UserService } from '@src/core/services/UserService';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { Request, Response } from 'express';

export class UserController {
  static register = async (req: Request, res: Response) => {
    const { message, data } = await UserService.register(req.body);

    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };
}

import { UserService } from '@src/core/services/UserService';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { Request, Response } from 'express';

export class UserController {
  static all = async (req: Request, res: Response) => {
    const { message, data } = await UserService.getAll();
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static getById = async (req: Request, res: Response) => {
    const { message, data } = await UserService.getById(req.params.userId);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static update = async (req: Request, res: Response) => {
    const { message, data } = await UserService.edit(req.params.userId, req.body);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  static delete = async (req: Request, res: Response) => {
    const { message } = await UserService.delete(req.params.userId);
    const response = BaseHttpResponse.success(message);

    res.status(200).json(response);
  };
}

import { MessageService } from '@src/core/services/MessageService';
import { BaseHttpResponse } from '@src/infrastructure/utils/base-Http-response.utils';
import { createObjectId } from '@src/infrastructure/utils/lib/createId';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

export class MessageController {
  /**
   * Fetch all messages
   * @param req - Express request object
   * @param res - Express response object
   */
  static all = async (req: Request, res: Response) => {
    const { message, data } = await MessageService.getAll();
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   * Fetch messages for a specific user
   * @param req - Express request object
   * @param res - Express response object
   */
  static getByUser = async (req: Request, res: Response) => {
    const { message, data } = await MessageService.getByUserId(req.params.userId);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   * Create a new message
   * @param req - Express request object
   * @param res - Express response object
   */
  static sendMessage = async (req: Request, res: Response) => {
    const { content } = req.body;
    const receiverId = req.params.receiverId;
    const senderId = req.user?._id?.toString();;

    if (!senderId) {
      return res.status(400).json(BaseHttpResponse.failed('Sender ID is missing'));
    }

    const { message, data } = await MessageService.sendMessage({ senderId, receiverId, content });
    const response = BaseHttpResponse.success(message, data);

    res.status(201).json(response);
  };

  /**
   * Update an existing message
   * @param req - Express request object
   * @param res - Express response object
   */
  static update = async (req: Request, res: Response) => {
    const { content } = req.body;
    const { message, data } = await MessageService.edit(req.params.messageId, content);
    const response = BaseHttpResponse.success(message, data);

    res.status(200).json(response);
  };

  /**
   * Delete a message
   * @param req - Express request object
   * @param res - Express response object
   */
  static delete = async (req: Request, res: Response) => {
    const { message } = await MessageService.delete(req.params.messageId);
    const response = BaseHttpResponse.success(message);

    res.status(200).json(response);
  };
}

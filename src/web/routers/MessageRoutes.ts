import { Router } from 'express';
import { createUserValidator, loginUserValidator } from '../validations/user.validation';
import { validateRequest } from '../middlewares/validation.middleware';
import { MessageController } from '../controllers/MessageController';
import { sendMessageValidator, getMessagesByUserValidator } from '../validations/message.validation';
import { auth } from '../middlewares/auth.middleware';

export const MessageRouter = Router();

MessageRouter.post(
  '/send',
  auth,
  // validateRequest(sendMessageValidator),
  MessageController.sendMessage
);

MessageRouter.get('/', MessageController.all);

MessageRouter.get('/:userId', validateRequest(getMessagesByUserValidator), MessageController.getByUser);

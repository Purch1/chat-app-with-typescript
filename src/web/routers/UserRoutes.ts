import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import {
  createUserValidator,
  deleteUserValidator,
  getUserByIdValidator,
  updateUserValidator
} from '../validations/user.validation';
import { validateRequest } from '../middlewares/validation.middleware';

export const userRouter = Router();

userRouter.get('/', UserController.all);

userRouter.get('/get/:userId', validateRequest(getUserByIdValidator), UserController.getById);

userRouter.patch('/update', validateRequest(updateUserValidator), UserController.update);

userRouter.delete('/delete', validateRequest(deleteUserValidator), UserController.delete);

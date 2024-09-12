import { Router } from 'express';
import { createUserValidator, loginUserValidator } from '../validations/user.validation';
import { validateRequest } from '../middlewares/validation.middleware';
import { AuthController } from '../controllers/AuthController';

export const authRouter = Router();

authRouter.post('/register', validateRequest(createUserValidator), AuthController.register);

authRouter.post('/login', validateRequest(loginUserValidator), AuthController.login);

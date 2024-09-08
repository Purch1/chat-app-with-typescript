import { Router } from 'express';
import { userRouter } from './UserRoutes';

export const appRouter = Router();

appRouter.use('/users', userRouter)

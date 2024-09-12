import { Router } from 'express';
import { authRouter } from './AuthRoutes';
import { userRouter } from './UserRoutes';
import { MessageRouter } from './MessageRoutes';

export const appRouter = Router();

appRouter.use('/auth', authRouter)
appRouter.use('/messages', MessageRouter)
appRouter.use('/users', userRouter)

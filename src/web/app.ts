import express from 'express';
import { appRouter } from './routers';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use("/api/v1", appRouter)

app.use(errorMiddleware)

export default app;
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { appRouter } from './routers';
import { handleInvalidRoutes } from './middlewares/invalid-route.middleware';
import { errorHandlingMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(helmet());

const corsOptions = {
  origin: '*', // Replace with your allowed origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', appRouter);

app.use(handleInvalidRoutes);
app.use(errorHandlingMiddleware);

export default app;

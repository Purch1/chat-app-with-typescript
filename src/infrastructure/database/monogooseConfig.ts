import { env } from '@src/config/env';
import mongoose from 'mongoose';
import logger from '../logger/logger';


export const connectDatabse = async () => {
  try {
    await mongoose.connect(env.databaseUrl)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error Connecting to MongoDB', error);
  }
};

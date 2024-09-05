import { env } from '@src/config/env';
import mongoose from 'mongoose';


export const connectDatabse = async () => {
  try {
    await mongoose.connect(env.databaseUrl)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error Connecting to MongoDB', error);
  }
};

import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  avatar: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

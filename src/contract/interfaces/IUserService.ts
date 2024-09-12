import { Document, ObjectId, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  avatar: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
}

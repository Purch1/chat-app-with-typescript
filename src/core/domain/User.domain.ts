import { IUser } from '@src/contract/interfaces/IUserService';
import mongoose, { Schema, Document } from 'mongoose';

const userSchema: Schema<IUser> = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

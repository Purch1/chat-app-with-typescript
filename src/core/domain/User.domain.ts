import { Genders } from '@src/contract/enums/UserType';
import { IUser } from '@src/contract/interfaces/IUserService';
import mongoose, { Schema } from 'mongoose';

const userSchema: Schema<IUser> = new Schema(
  {
    avatar: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      required: true
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
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
      enum: Genders
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;

import { IUser } from '@src/contract/interfaces/IUserService';
import { createObjectId } from '@src/infrastructure/utils/lib/createId';
import { Document, Types } from 'mongoose';

export class UserResponseDto {
  static fromUser(user: IUser) {
    return {
      _id: user._id,
      avatar: user.avatar,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      gender: user.gender,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  static fromManyUser(users: IUser[]) {
    return users.map((user) => UserResponseDto.fromUser(user));
  }
}

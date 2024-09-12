import { IUser } from '@src/contract/interfaces/IUserService';
import { Types } from 'mongoose';

export class UserResponseDto {
  /**
   * Converts a single user object into the DTO format.
   * 
   * @param user - The user object to transform.
   * @returns The transformed user DTO.
   */
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

  /**
   * Converts an array of user objects into the DTO format.
   * 
   * @param users - The array of user objects to transform.
   * @returns The array of transformed user DTOs.
   */
  static fromManyUser(users: IUser[]) {
    return users.map((user) => UserResponseDto.fromUser(user));
  }
}

import { IUser } from "@src/contract/interfaces/IUserService";

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
        updatedAt: user.updatedAt,
      };
    }
  
    static fromManyUser(users: IUser[]): UserResponseDto[] {
      return users.map(user => this.fromUser(user));
    }
  }
  
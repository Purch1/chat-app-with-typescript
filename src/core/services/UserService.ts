import { UserResponseDto } from '@src/contract/dtos/users/User-response.dto';
import { TCreateUserPayload, TUpdateUserPayload } from '@src/web/validations/user.validation';
import { UserRepository } from '@src/infrastructure/repositories/UserRepository';
import { NotFoundException } from '../exceptions';
import { Encryption } from '@src/infrastructure/utils/encryption';

export class UserService {

  static async getAll(): Promise<{ message: string; data: UserResponseDto[] }> {
    const users = await UserRepository.all();
    return {
      message: 'Users fetched',
      data: UserResponseDto.fromManyUser(users)
    };
  }

  static async getById(userId: string): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User fetched',
      data: UserResponseDto.fromUser(user)
    };
  }

  static async edit(
    userId: string,
    updateUserDto: TUpdateUserPayload
  ): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.update(userId, updateUserDto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User updated',
      data: UserResponseDto.fromUser(user)
    };
  }

  static async delete(userId: string): Promise<{ message: string; }> {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      message: 'User deleted'
    };
  }
}

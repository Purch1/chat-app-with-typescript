import { UserRepository } from '@src/infrastructure/repositories/UserRepository';
import { Encryption } from '@src/infrastructure/utils/encryption';
import { TCreateUserPayload } from '@src/web/validations/user.validation';
import { NotFoundException } from '../exceptions';
import { UserResponseDto } from '@src/contract/dtos/users/User-response.dto';

export class AuthService {
  static async register(entity: TCreateUserPayload) {
    const password = await Encryption.encryptText(entity.password, 12);
    const user = await UserRepository.insert({ ...entity, password });

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }

    return {
      message: 'User created successfully',
      data: UserResponseDto.fromUser(user)
    };
  }

  static async login(entity: TCreateUserPayload) {
    const password = await Encryption.encryptText(entity.password, 12);
    const user = await UserRepository.insert({ ...entity, password });

    if (!user) {
      throw new NotFoundException('Failed to create user');
    }

    return {
      message: 'User created successfully',
      data: UserResponseDto.fromUser(user)
    };
  }
}

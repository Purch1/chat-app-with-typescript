import { UserRepository } from '@src/infrastructure/repositories/UserRepository';
import { Encryption } from '@src/infrastructure/utils/encryption';
import { TCreateUserPayload, TLoginUserPayload } from '@src/web/validations/user.validation';
import { ConflictException, NotFoundException } from '../exceptions';
import { UserResponseDto } from '@src/contract/dtos/users/User-response.dto';
import { JWTService } from '@src/infrastructure/utils/token.util';

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

  static async login({ email, password }: TLoginUserPayload) {
    const user = await UserRepository.findEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await Encryption.compare(user.password, password);
    if (!isMatch) {
      throw new ConflictException({ message: 'Invalid credential' });
    }

    return {
      message: 'User created successfully',
      data: {
        accessToken: JWTService.generateAccessToken({ id: user._id }),
        user: UserResponseDto.fromUser(user),
      }
    };
  }
}

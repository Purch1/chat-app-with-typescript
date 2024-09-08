import { UserResponseDto } from '@src/contract/dtos/users/User-response.dto';
import { TCreateUserPayload } from '@src/web/validations/user.validation';
import { UserRepository } from '@src/infrastructure/repositories/UserRepository';

export class UserService {
  static async register(entity: TCreateUserPayload): Promise<{ message: string; data: UserResponseDto }> {
    const user = await UserRepository.insert(entity);

    return {
      message: 'User created successfully',
      data: UserResponseDto.fromUser(user)
    };
  }
}

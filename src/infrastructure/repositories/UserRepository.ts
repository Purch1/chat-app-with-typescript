import User from '@src/core/domain/User.domain';
import BaseRepository from './baseRepository';
import { IUser } from '@src/contract/interfaces/IUserService';

export class UserRepository extends BaseRepository {
  static async all() {
    return User.find();
  }
  static async insert(entity: Partial<IUser>): Promise<IUser> {
    try {
      const user = new User(entity);
      await user.save();

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
      throw new Error('Failed to insert user');
    }
  }

  static async findById(id: string) {
    return User.findById(id);
  }
}

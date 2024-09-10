import User from '@src/core/domain/User.domain';
import BaseRepository from './baseRepository';
import { IUser } from '@src/contract/interfaces/IUserService';
import { TCreateUserPayload, TUpdateUserPayload } from '@src/web/validations/user.validation';

export class UserRepository extends BaseRepository {
  static async all() {
    return User.find();
  }
  static async insert(entity: TCreateUserPayload) {
    try {
      const user = new User(entity);
      await user.save();

      return user;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findById(id: string) {
    return User.findById(id);
  }

  static async update(id: string, entity: TUpdateUserPayload) {
    try {
      return User.findByIdAndUpdate(id, entity, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }
}

import { Types } from 'mongoose';
import Message from '@src/core/domain/Message.domain';
import { IMessage } from '@src/contract/interfaces/IMessageService';
import BaseRepository from './baseRepository';
import { TCreateMessagePayload } from '@src/web/validations/message.validation';

export class MessageRepository extends BaseRepository {
  // Get all messages
  static async all(): Promise<IMessage[]> {
    return Message.find();
  }

  static async insert(entity: TCreateMessagePayload) {
    try {
      const message = new Message(entity);
      await message.save();
      return message;
    } catch (error) {
      this.handleRepositoryError(error);
    }
  }

  static async findByUser(userId: string): Promise<IMessage[]> {
    return Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });
  }

  static async findById(id: string): Promise<IMessage | null> {
    return Message.findById(id);
  }

  static async update(id: string, entity: string): Promise<IMessage | null> {
    try {
      return Message.findByIdAndUpdate(id, { entity }, { new: true });
    } catch (error) {
      this.handleRepositoryError(error);
      return null;
    }
  }

  static async delete(id: string): Promise<IMessage | null> {
    try {
      return Message.findByIdAndDelete(id);
    } catch (error) {
      this.handleRepositoryError(error);
      return null;
    }
  }
}

import Conversation from '@src/core/domain/Conversation.domain';
import { IConversation, TFindConvasationFilter } from '@src/contract/interfaces/IConversation';
import BaseRepository from './baseRepository';
import { TCreateConversationPayload } from '@src/web/validations/conversation.validation';

export class ConversationRepository extends BaseRepository {
  // Get all conversations
  static async all(): Promise<IConversation[]> {
    return Conversation.find().populate('participants').populate('messages');
  }

  // Insert a new conversation
  static async insert(entity: TCreateConversationPayload): Promise<IConversation | null>  {
    try {
      const conversation = new Conversation(entity);
      await conversation.save();

      return conversation;
    } catch (error) {
      this.handleRepositoryError(error);
      return null; 
    }
  }

  // Find conversation by user
  static async findByUser(senderId: string, receiverId: string) {
    return Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })
      .populate('participants')
      .populate('messages');
  }

  // Find conversation by id
  static async findById(id: string): Promise<IConversation | null> {
    return Conversation.findById(id).populate('participants').populate('messages');
  }

  // Update conversation by id
  static async update(id: string, entity: Partial<IConversation>): Promise<IConversation | null> {
    try {
      return Conversation.findByIdAndUpdate(id, entity, { new: true }).populate('participants').populate('messages');
    } catch (error) {
      this.handleRepositoryError(error);
      return null;
    }
  }

  // Delete conversation by id
  static async delete(id: string): Promise<IConversation | null> {
    try {
      return Conversation.findByIdAndDelete(id);
    } catch (error) {
      this.handleRepositoryError(error);
      return null;
    }
  }
}

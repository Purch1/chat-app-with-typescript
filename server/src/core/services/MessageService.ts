import { Types } from 'mongoose';
import { MessageRepository } from '@src/infrastructure/repositories/MessageRespository';
import { MessageResponseDto } from '@src/contract/dtos/messages/Message-response.dto';
import { NotFoundException } from '../exceptions';
import { TCreateMessagePayload, TSendMessagePayload } from '@src/web/validations/message.validation';
import { ConversationRepository } from '@src/infrastructure/repositories/conversationRepository';
import { TFindConvasationFilter } from '@src/contract/interfaces/IConversation';

export class MessageService {
  /**
   * Fetch all messages
   * @returns List of messages
   */
  static async getAll(): Promise<{ message: string; data: MessageResponseDto[] }> {
    const messages = await MessageRepository.all();
    return {
      message: 'Messages fetched',
      data: MessageResponseDto.fromManyMessages(messages)
    };
  }

  /**
   * Create a new message
   * @param senderId - The ID of the sender
   * @param receiverId - The ID of the receiver
   * @param content - The content of the message
   * @returns Created message
   */
  // static async sendMessage(senderId: string, receiverId: string, { content }: TSendMessagePayload) {
  static async sendMessage({ senderId, receiverId, content }: TCreateMessagePayload) {
    let conversation = await ConversationRepository.findByUser(senderId, receiverId);

    if (!conversation) {
      conversation = await ConversationRepository.insert({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    const newMessage = await MessageRepository.insert({ senderId, receiverId, content });

    if (newMessage && conversation) {
      conversation.messages.push(newMessage.id);
      await conversation.save();
    }

    return {
      message: 'Message created successfully',
      data: MessageResponseDto.fromMessage(newMessage!)
    };
  }

  /**
   * Fetch messages for a specific user (sent or received)
   * @param userId - The ID of the user
   * @returns List of messages related to the user
   */
  static async getByUserId(userId: string): Promise<{ message: string; data: MessageResponseDto[] }> {
    const messages = await MessageRepository.findByUser(userId);

    if (!messages.length) {
      throw new NotFoundException('No messages found for the user');
    }

    return {
      message: 'Messages fetched',
      data: MessageResponseDto.fromManyMessages(messages)
    };
  }

  /**
   * Update an existing message's content
   * @param messageId - The ID of the message to update
   * @param content - The new content for the message
   * @returns Updated message
   */
  static async edit(messageId: string, content: string): Promise<{ message: string; data: MessageResponseDto }> {
    const message = await MessageRepository.update(messageId, content);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return {
      message: 'Message updated',
      data: MessageResponseDto.fromMessage(message)
    };
  }

  /**
   * Delete a message by its ID
   * @param messageId - The ID of the message to delete
   * @returns Confirmation of deletion
   */
  static async delete(messageId: string): Promise<{ message: string }> {
    const message = await MessageRepository.findById(messageId);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    await MessageRepository.delete(messageId);

    return {
      message: 'Message deleted successfully'
    };
  }
}

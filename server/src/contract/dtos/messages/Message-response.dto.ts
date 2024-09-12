import { IMessage } from '@src/contract/interfaces/IMessageService';

export class MessageResponseDto {
  /**
   * Converts a single message object into the DTO format.
   *
   * @param message - The message object to transform.
   * @returns The transformed message DTO.
   */
  static fromMessage(message: IMessage) {
    return {
      id: message.id, 
      senderId: message.senderId, 
      receiverId: message.receiverId,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };
  }

  /**
   * Converts an array of message objects into the DTO format.
   *
   * @param messages - The array of message objects to transform.
   * @returns The array of transformed message DTOs.
   */
  static fromManyMessages(messages: IMessage[]) {
    return messages.map((message) => MessageResponseDto.fromMessage(message));
  }
}

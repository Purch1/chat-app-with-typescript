import { Document } from 'mongoose';

export interface IMessage extends Document {
  id: string;
  content: string;
  senderId: string;
  chatRoomId: string;
  createdAt: Date;
  updatedAt: Date;
}

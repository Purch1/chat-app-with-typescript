import { Document, ObjectId, Types } from 'mongoose';

export interface IMessage extends Document {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

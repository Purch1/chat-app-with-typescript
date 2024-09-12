import { Document, Types } from 'mongoose';

export interface IConversation extends Document {
  id: string;
  participants: string[];
  message: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TFindConvasationFilter  {
  senderId: string;
  receiverId: string
}
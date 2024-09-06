import { IMessage } from '@src/contract/interfaces/IMessageService';
import mongoose, { Document, Schema } from 'mongoose';

const messageSchema: Schema<IMessage> = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    senderId: {
      type: String,
      required: true
    },
    chatRoomId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const MessageModel = mongoose.model<IMessage>('Message', messageSchema);

export default MessageModel;

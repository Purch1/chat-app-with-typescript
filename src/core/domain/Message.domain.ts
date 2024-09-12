import { IMessage } from '@src/contract/interfaces/IMessageService';
import mongoose, { Document, model, Schema } from 'mongoose';

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true
    },
    content: {
      type: String,
      // required: true
    }
  },
  {
    timestamps: true
  }
);

const Message = model<IMessage>('Message', messageSchema);

export default Message;

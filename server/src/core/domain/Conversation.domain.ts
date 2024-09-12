import { IConversation } from '@src/contract/interfaces/IConversation';
import mongoose, { Document, Schema } from 'mongoose';

const ConversationSchema: Schema<IConversation> = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Message',
         default:[],
      }
    ]
  },
  {
    timestamps: true
  }
);

const Conversation = mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;

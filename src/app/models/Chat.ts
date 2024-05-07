import {Schema, model} from 'mongoose';

export const Chat = model('Chat', new Schema({
  messages: {
    type: {
      question: {
        type: String,
        require: true,
      },
      answer: {
        type: String,
      }
    },
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

import {Schema, model} from 'mongoose';

export const User = model('Chat', new Schema({
  messages: [{
    question: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

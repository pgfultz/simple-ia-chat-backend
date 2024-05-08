import {Schema, model} from 'mongoose';

export const Chat = model('Chat', new Schema({
  name: {
    type: String,
    required: [true, 'The name field is required']
  },
  messages: {
    type: [{
      role: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true
      },
      sentAt: {
        type: Date,
        default: Date.now
      }
    }],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}));

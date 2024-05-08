import {Request, Response} from 'express';
import {Chat} from '../models/Chat';
import {GroqChatCompletion} from '../services/Groq';
import { resolve } from 'path';

class ChatController{
  async index(req: Request, resp: Response){
    try{
      const messages = await Chat.find();

      return resp.json(messages);
    }catch(err){
      return resp.sendStatus(500);
    }
  }

  async show(req: Request, resp: Response){
    try{
      const _id = req.params.id;
      //console.log(_id);

      const messages = await Chat.findById(_id);

      return resp.json(messages);
    }catch(err){
      return resp.sendStatus(500);
    }
  }

  async store(req: Request, resp: Response){
    try{
      const addDb = await Chat.create(req.body);

      if(!addDb){
        return resp.status(400).json({error: 'An unexpected error occurred'});
      }

      return resp.json(addDb);
    } catch(err){
      return resp.sendStatus(500);
    }
  }

  async update(req: Request, resp: Response){
    try{
      const _idChat = req.params.id;
      console.log(req.body);

      let newMessages: any = [];
      newMessages.push(req.body[req.body.length - 1]);

      const callGroq = await GroqChatCompletion(req.body);
      //console.log(callGroq);

      if(!callGroq){
        return resp.status(400).json({error: 'An unexpected error occurred'});
      }

      newMessages.push({role: 'assistant', content: callGroq});
      //console.log(newMessages);

      const addDb = await Chat.findOneAndUpdate(
        { _id: _idChat },
        { $push: { messages: { $each: newMessages } } },
        { new: true });

      if(!addDb){
        return resp.status(400).json({error: 'An unexpected error occurred'});
      }

      return resp.json(addDb);
    } catch(err){
      //console.log(err);
      return resp.sendStatus(500);
    }
  }

  async destroy(req: Request, resp: Response){
    try{
      const id = req.params.id;
      //console.log(id);

      const messages = await Chat.findByIdAndDelete(id);

      return resp.json(messages);
    }catch(err){
      return resp.sendStatus(500);
    }
  }
}

export default new ChatController();

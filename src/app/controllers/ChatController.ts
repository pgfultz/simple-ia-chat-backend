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
    return resp.json({ok: true});
  }

  async store(req: Request, resp: Response){
    try{
      let msgFormat = {
        question: req.body.question,
        answer: ''
      };

      if(!req.body.question || req.body.question.length < 3){
        return resp.status(400).json({error: 'Invalid question'});
      }

      const callGroq = await GroqChatCompletion(req.body.question);
      //console.log(callGroq);

      if(!callGroq){
        return resp.status(400).json({error: 'An unexpected error occurred'});
      }

      msgFormat.answer = callGroq;

      const addDb = await Chat.create({messages: msgFormat});

      if(!addDb){
        return resp.status(400).json({error: 'An unexpected error occurred'});
      }

      return resp.json(addDb);
    } catch(err){
      return resp.sendStatus(500);
    }
  }

  async update(req: Request, resp: Response){
    return resp.json({ok: true});
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

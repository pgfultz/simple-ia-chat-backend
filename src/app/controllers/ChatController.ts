import {Request, Response} from 'express';
//import Chat from '../models/Chat';
import {GroqChatCompletion} from '../services/Groq';
import { resolve } from 'path';

class ChatController{
  async index(req: Request, resp: Response){
    return resp.json({ok: true});
  }

  async show(req: Request, resp: Response){
    return resp.json({ok: true});
  }

  async store(req: Request, resp: Response){
    let msgFormat = {
      question: req.body.question,
      answer: ''
    };

    if(!req.body.question || req.body.question.length < 3){
      return resp.status(400).json({error: 'Invalid question'});
    }

    const callGroq = await GroqChatCompletion(req.body.question);
    //console.log(callGroq);
    msgFormat.answer = callGroq;

    return resp.json(msgFormat);
  }

  async update(req: Request, resp: Response){
    return resp.json({ok: true});
  }

  async destroy(req: Request, resp: Response){
    return resp.json({ok: true});
  }
}

export default new ChatController();

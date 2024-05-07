import {Request, Response} from 'express';

class ChatController{
  async index(req: Request, resp: Response){
    return resp.json({ok: true});
  }
}

export default new ChatController();

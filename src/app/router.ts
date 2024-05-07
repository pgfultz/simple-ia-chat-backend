import {Router} from 'express';

import ChatController from './controllers/ChatController';

export const router = Router();

router.get('/chat', ChatController.index);

router.post('/chat', ChatController.store);

router.delete('/chat/:id', ChatController.destroy);

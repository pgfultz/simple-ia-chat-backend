import {Router} from 'express';

import ChatController from './controllers/ChatController';

export const router = Router();

router.get('/chat', ChatController.index);

router.get('/chat/:id', ChatController.show);

router.post('/chat', ChatController.store);

router.put('/chat/:id', ChatController.update);

router.delete('/chat/:id', ChatController.destroy);

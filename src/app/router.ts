import {Router} from 'express';

import ChatController from './controllers/ChatController';

export const router = Router();

router.get('/', ChatController.index);

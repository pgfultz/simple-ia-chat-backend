import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

import { router } from './app/router';

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log('Connected ');

    const app = express();
    app.use(express.json());
    app.use(router);

    app.listen(process.env.PORT, () => {
      console.log('Server is running on port: '+process.env.PORT)
    });
  })
  .catch(err => console.log('MongoDb connect error'));

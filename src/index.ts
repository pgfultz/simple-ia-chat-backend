import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log('Connected ');

    const app = express();

    app.listen(process.env.PORT, () => {
      console.log('Server is running on port: '+process.env.PORT)
    });
  })
  .catch(err => console.log('MongoDb connect error'));

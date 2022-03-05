import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';
import mongoose from 'mongoose';

import {currentUserRouter} from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cookieSession from 'cookie-session';
const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async (req, res) => {
  new NotFoundError();
});

// middleware to handle errors
app.use(errorHandler);


const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY must be defined');
    }
    try{ 

        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        // , 
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        console.log('Connected to MongoDB');        
    }catch(err){
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!');
    });

};

start();
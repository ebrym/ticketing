import express from 'express';
import 'express-async-errors'
import {json} from 'body-parser';

import {currentUserRouter} from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { allUsersRouter } from './routes/all-users';
import { errorHandler, NotFoundError } from '@ebrym/common';
import cookieSession from 'cookie-session';
const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUserRouter);
app.use(allUsersRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async (req, res) => {
  new NotFoundError();
});

// middleware to handle errors
app.use(errorHandler);

export { app };
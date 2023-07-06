import express from'express';
import 'express-async-errors';
import cors from'cors';
import morgan from'morgan';
import cookieSession from'cookie-session';
import bodyParser from'body-parser';
import dotenv from 'dotenv';

import api from'./routes/api';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { validateLoggedUser } from './middlewares/userValidator';
import path from 'path';

dotenv.config();

const app = express();

app.use(cors({
  origin: `${process.env.FRONT_IP_PUBLIC}`,
  credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'session', 
    secret: process.env.TOKEN_PASSPHRASE, // Replace with your own secret key
    maxAge: 24 * 60 * 60 * 1000, // Set the cookie to expire after 24 hours
    secure: true, // Set to true if using HTTPS
    httpOnly: true,
    sameSite: 'none',
  })
);
app.use(morgan('dev'));

app.use('/proofs', express.static(path.join(__dirname, './proofs')));

app.use('/api', api);

app.all('*', async (req, res) => {
  throw new NotFoundError('');
});

app.use(errorHandler);

export default app
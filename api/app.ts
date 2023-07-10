import express from'express';
import 'express-async-errors';
import cors from'cors';
import morgan from'morgan';
// import cookieSession from'cookie-session';
import bodyParser from'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import api from'./routes/api';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

const app = express();
app.enable('trust proxy');

app.use(express.json());

app.use(cors({
  origin: `${process.env.FRONT_IP_PUBLIC}`,
  credentials: true,
  exposedHeaders: ['Authorization'],
}));

app.use(bodyParser.json());

// app.use(
//   cookieSession({
//     name: 'session',
//     secret: process.env.TOKEN_PASSPHRASE,
//     maxAge: 24 * 60 * 60 * 1000,
//     secure: true,
//     httpOnly: true,
//     sameSite: 'none',
//   })
//   );

app.use(morgan('dev'));

app.use('/proofs', express.static(path.join(__dirname, './proofs')));

app.use('/api', api);

app.all('*', async (req, res) => {
  throw new NotFoundError('');
});

app.use(errorHandler);

export default app
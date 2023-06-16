import app from './app'
import http from 'http';
import dotenv from 'dotenv';
import { mongoConnect } from './config/mongo';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();

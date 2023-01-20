const http = require('http');
require('dotenv').config();
const app = require('./app');
const { mongoConnect } = require('./config/mongo.js');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();

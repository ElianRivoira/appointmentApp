const express = require('express');

const userRouter = require('./users/user.router');

const api = express.Router();

api.use('/', (req, res) => {
  res.send('puto');
});

api.use('/users', userRouter);

module.exports = api;

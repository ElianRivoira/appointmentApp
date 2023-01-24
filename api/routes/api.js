const express = require('express');

const userRouter = require('./users/user.router');

const api = express.Router();
const userRouter = require('./users/user.router');

api.use('/users', userRouter);

module.exports = api;

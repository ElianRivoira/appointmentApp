const express = require('express');

const userRouter = require('./users/user.router');

const api = express.Router();

api.use('/users', userRouter);

module.exports = api;

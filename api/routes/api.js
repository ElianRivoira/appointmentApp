const express = require('express');

const api = express.Router();
const userRouter = require('./users/user.router');

api.use('/users', userRouter);

module.exports = api;
const express = require('express');

const userRouter = require('./users/user.router');
const appointmentRouter = require('./appointments/appointment.router');
const branchRouter = require('./branch/branch.router');

const api = express.Router();

api.use('/users', userRouter);
api.use('/appointments', appointmentRouter);
api.use('/branch', branchRouter);

module.exports = api;

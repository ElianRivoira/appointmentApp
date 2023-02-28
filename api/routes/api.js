const express = require('express');

const userRouter = require('./users/user.router');
const appointmentRouter = require('./appointments/appointment.router');
const branchRouter = require('./branch/branch.router');
const operatorRouter = require('./operators/operator.router');

const api = express.Router();

api.use('/users', userRouter);
api.use('/appointments', appointmentRouter);
api.use('/branches', branchRouter);
api.use('/operators', operatorRouter);

module.exports = api;

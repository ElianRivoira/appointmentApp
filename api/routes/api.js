const express = require('express');

const userRouter = require('./users/user.router');
const appointmentRouter = require('./appointments/appointment.router');

const api = express.Router();

api.use('/users', userRouter);
api.use('/appointments', appointmentRouter);

module.exports = api;

import express from 'express';

import userRouter from './users/user.router';
import appointmentRouter from './appointments/appointment.router';
import branchRouter from './branch/branch.router';
import operatorRouter from './operators/operator.router';

const api = express.Router();

api.use('/users', userRouter);
api.use('/appointments', appointmentRouter);
api.use('/branches', branchRouter);
api.use('/operators', operatorRouter);

export default api;

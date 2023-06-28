import express from 'express';

import appointmentController from './appointment.controller';
import { validateLoggedUser } from '../../middlewares/userValidator';

const router = express.Router();

router.post('/', validateLoggedUser, appointmentController.httpPostReserve);

router.get('/metrics', appointmentController.httpCalculateMetrics);

router.get('/all/:id', appointmentController.httpGetAllAppointmentsFromUser);

router.get('/:id', appointmentController.httpGetOneAppointment);

router.put('/:id', appointmentController.httpEditAppointment);

router.put('/confirm/:id', appointmentController.httpConfirmAppointment);

router.put('/cancel/:id', appointmentController.httpCancelAppointment);

export default router;

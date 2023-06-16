import express from 'express';

import appointmentController from './appointment.controller';

const router = express.Router();

router.post('/', appointmentController.httpPostReserve);

router.get('/all/:id', appointmentController.httpGetAllAppointmentsFromUser);

router.get('/:id', appointmentController.httpGetOneAppointment);

router.put('/:id', appointmentController.httpEditAppointment);

router.put('/confirm/:id', appointmentController.httpConfirmAppointment);

router.delete('/:id', appointmentController.httpDeleteAppointment);

export default router;

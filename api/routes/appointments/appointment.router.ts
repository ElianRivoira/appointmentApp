import express from 'express';

import appointmentController from './appointment.controller';
import { validateLoggedAdmin, validateLoggedOperator, validateLoggedUser } from '../../middlewares/userValidator';
import { validatePostAppointment } from '../../middlewares/appointmentValidator';
import { uploadProof } from '../../middlewares/multer';

const router = express.Router();

router.post('/', validateLoggedUser, validatePostAppointment, appointmentController.httpPostReserve);

router.get('/metrics', validateLoggedAdmin, appointmentController.httpCalculateMetrics);

router.get('/all/:id', appointmentController.httpGetAllAppointmentsFromUser);

router.get('/:id', validateLoggedUser, appointmentController.httpGetOneAppointment);

router.put('/createProof', uploadProof.single('proof'), appointmentController.httpCreateProof);

router.put('/confirm/:id', validateLoggedOperator, appointmentController.httpConfirmAppointment);

router.put('/cancel/:id', validateLoggedUser, appointmentController.httpCancelAppointment);

router.put('/:id', validateLoggedUser, appointmentController.httpEditAppointment);

export default router;

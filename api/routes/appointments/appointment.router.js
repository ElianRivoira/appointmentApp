const express = require('express');
const appointmentController = require('./appointment.controller');

const router = express.Router();

router.post('/', appointmentController.httpPostReserve);

router.get('/all/:id', appointmentController.httpGetAllAppointmentsFromUser);

router.get('/:id', appointmentController.httpGetOneAppointment);

router.put('/:id', appointmentController.httpEditAppointment);

module.exports = router;

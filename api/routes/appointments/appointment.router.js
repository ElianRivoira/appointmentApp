const express = require('express');
const appointmentController = require('./appointment.controller');

const router = express.Router();

router.post('/', appointmentController.httpPostReserve);

router.get('/:id', appointmentController.httpGetAllAppointmentsFromUser);

module.exports = router;

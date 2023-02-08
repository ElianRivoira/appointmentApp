const express = require('express');
const appointmentController = require('./appointment.controller');

const router = express.Router();

router.post('/', appointmentController.httpPostReserve);

module.exports = router;
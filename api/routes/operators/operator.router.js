const express = require('express');
const operatorController = require('./operator.controller');

const router = express.Router();

router.post('/', operatorController.createOperator);

module.exports = router
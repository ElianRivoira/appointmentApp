const express = require('express');
const operatorController = require('./operator.controller');

const router = express.Router();

router.post('/', operatorController.createOperator);

router.get('/', operatorController.getOperators);

router.get('/:id', operatorController.getOneOperator);

module.exports = router
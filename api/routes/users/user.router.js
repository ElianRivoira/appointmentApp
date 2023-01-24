const express = require('express');
const router = express.Router();
const { httpUserLogin } = require('./user.controller');

router.post('login', httpUserLogin);

module.exports = router;

const express = require('express');
const { validateSignUp } = require('../../middlewares/userValidator');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', [validateSignUp], userController.signUp);

router.post('/login', userController.httpUserLogin);

module.exports = router;
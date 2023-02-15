const express = require('express');
const { validateLoggedUser } = require('../../middlewares/auth');
const { validateSignUp } = require('../../middlewares/userValidator');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', [validateSignUp], userController.httpSignUp);

router.post('/login', userController.httpUserLogin);

router.get('/me', [validateLoggedUser], userController.httpGetUser);

router.put('/:id', userController.httpUpdateUser);

router.put('/pass/:id', userController.httpUpdatePassword);

router.post('/pass/email', userController.httpSendPassEmail)

module.exports = router;

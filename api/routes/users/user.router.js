const express = require('express');
const { validateSignUp } = require('../../middlewares/userValidator');
const userController = require('./user.controller');

const router = express.Router();

router.post('/', [validateSignUp], userController.signUp);

module.exports = router;
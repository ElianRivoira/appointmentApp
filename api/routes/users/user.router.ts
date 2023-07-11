import express from 'express';
import {
  validateChangePassword,
  validateForgotPassword,
  validateLoggedUser,
  validateLogin,
  validateRecoverPassword,
  validateSignUp,
  validateUpdateUser,
} from '../../middlewares/userValidator';
import userController from './user.controller';

const router = express.Router();

router.post('/', validateSignUp, userController.httpSignUp);

router.post('/login', validateLogin, userController.httpUserLogin);

router.post('/forgot-pass', validateForgotPassword, userController.httpForgotPassword);

router.get('/me', validateLoggedUser, userController.httpGetUser);

router.get('/recover-pass', validateRecoverPassword, userController.httpRecoverPassword);

router.put('/put', validateLoggedUser, validateUpdateUser, userController.httpUpdateUser);

router.put('/change-pass', validateChangePassword, userController.httpUpdatePassword);

export default router;

import express from 'express';
import { validateLoggedUser, validateLogin, validateSignUp, validateUpdateUser } from '../../middlewares/userValidator';
import userController from './user.controller';

const router = express.Router();

router.post('/', validateSignUp, userController.httpSignUp);

router.post('/login', validateLogin, userController.httpUserLogin);

router.get('/me', validateLoggedUser, userController.httpGetUser);

router.put('/put', validateLoggedUser, validateUpdateUser, userController.httpUpdateUser);

router.put('/pass/:id', userController.httpUpdatePassword);

router.post('/pass/email', userController.httpSendPassEmail)

export default router;

import express from 'express';

import operatorController from './operator.controller';
import { validateLoggedAdmin, validateLoggedUser, validateSignUp } from '../../middlewares/userValidator';

const router = express.Router();

router.post('/', validateLoggedAdmin, validateSignUp, operatorController.httpCreateOperator);

router.get('/', validateLoggedUser, operatorController.httpGetOperators);

router.get('/:id', validateLoggedUser, operatorController.httpGetOneOperator);

router.delete('/:id', validateLoggedAdmin, operatorController.httpDeleteOperator);

export default router;
